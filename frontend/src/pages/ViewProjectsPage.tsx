import { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Calendar, Loader2, Search, Filter } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

export default function ViewProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProjects(
        data.map((project) => ({
          ...project,
          objectives:
            typeof project.objectives === 'string'
              ? JSON.parse(project.objectives)
              : project.objectives || [],
        }))
      );
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.promoter_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = !selectedSector || project.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  const uniqueSectors = Array.from(new Set(projects.map((p) => p.sector)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Submitted Projects</h1>
          <p className="text-gray-600 text-lg">Browse all agricultural projects seeking funding</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, or promoter..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative md:w-64">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="">All Sectors</option>
                {uniqueSectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{project.title}</h3>
                  <p className="text-green-100 flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                    {project.short_description}
                  </p>

                  <div className="flex items-center justify-between py-2 border-t border-gray-200">
                    <span className="text-gray-600 text-sm">Sector</span>
                    <span className="font-semibold text-gray-900 text-sm">{project.sector}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-gray-200">
                    <span className="text-gray-600 text-sm">Funding Required</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(project.funding_required, project.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-gray-200">
                    <span className="text-gray-600 text-sm flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Revenue (Year 1)
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(project.expected_revenue_year1, project.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-gray-200">
                    <span className="text-gray-600 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Duration
                    </span>
                    <span className="font-semibold text-gray-900">{project.project_duration} months</span>
                  </div>

                  <div className="pt-2 border-t-2 border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Promoter</div>
                    <div className="font-semibold text-gray-900">{project.promoter_name}</div>
                  </div>

                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      {project.funding_type}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {project.employment_generated} Jobs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-gray-600">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>
    </div>
  );
}

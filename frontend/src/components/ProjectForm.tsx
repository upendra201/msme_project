import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { Plus, Trash2, Eye, Save, Loader2,  FileText,
  FileSpreadsheet,LineChart,
  FileDown, } from 'lucide-react';


interface DPRResponse {
  message?: string;
  pdf_url?: string;
  excel_url?: string;
  [key: string]: any;
}

interface Project {
  id?: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  short_description: string;
  location: string;
  sector: string;
  production_capacity: number;
  currency: string;
  estimated_cost: number;
  promoter_name: string;
  contact_email: string;
  contact_phone: string;
  employment_generated: number;
  project_duration: number;
  objectives: string[];
  funding_required: number;
  funding_type: string;
  land_area: string;
  infrastructure_details: string;
  technology_used: string;
  expected_revenue_year1: number;
  expected_revenue_year2: number;
  expected_revenue_year3: number;
}

const SECTORS = [
  'Agro Processing',
  'Food Tech',
  'Organic Farming',
  'Dairy & Animal Husbandry',
  'Horticulture',
  'Agricultural Equipment',
  'Crop Production',
  'Sustainable Agriculture',
  'Aquaculture',
  'Forestry',
];

const FUNDING_TYPES = ['Term Loan', 'Equity', 'Subsidy', 'Grant'];

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];

export default function ProjectForm() {
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
   const [result, setResult] = useState<DPRResponse | null>(null);
  

  const [formData, setFormData] = useState<Omit<Project, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    short_description: '',
    location: '',
    sector: '',
    production_capacity: 0,
    currency: 'INR',
    estimated_cost: 0,
    promoter_name: '',
    contact_email: '',
    contact_phone: '',
    employment_generated: 0,
    project_duration: 0,
    objectives: [''],
    funding_required: 0,
    funding_type: '',
    land_area: '',
    infrastructure_details: '',
    technology_used: '',
    expected_revenue_year1: 0,
    expected_revenue_year2: 0,
    expected_revenue_year3: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ''],
    }));
  };

  const removeObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => (i === index ? value : obj)),
    }));
  };

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitSuccess(false);

  try {
    // Convert formData to match backend model
    const payload = {
      title: formData.title,
      short_description: formData.short_description,
      location: formData.location || null,
      capacity: formData.production_capacity || 0,
      currency: formData.currency || "INR",
      additional: {
        sector: formData.sector,
        estimated_cost: formData.estimated_cost,
        promoter_name: formData.promoter_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        employment_generated: formData.employment_generated,
        project_duration: formData.project_duration,
        objectives: formData.objectives,
        funding_required: formData.funding_required,
        funding_type: formData.funding_type,
        land_area: formData.land_area,
        infrastructure_details: formData.infrastructure_details,
        technology_used: formData.technology_used,
        expected_revenue_year1: formData.expected_revenue_year1,
        expected_revenue_year2: formData.expected_revenue_year2,
        expected_revenue_year3: formData.expected_revenue_year3,
      },
    };

    const resp = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      throw new Error(`Server error: ${resp.status}`);
    }

    const data = await resp.json();
    setResult(data);
    setSubmitSuccess(true);
  } catch (error) {
    console.error("Error generating DPR:", error);
    setResult({ message: "Failed to generate DPR. Check backend logs." });
    setSubmitSuccess(false);
  } finally {
    setIsSubmitting(false);
  }
};




  return (
    <div>
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Project Preview</h3>
            <pre className="max-h-64 overflow-auto text-sm bg-gray-50 p-3 rounded">
              {JSON.stringify(formData, null, 2)}
            </pre>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Project</h1>
          <p className="text-gray-600">
            Fill in the details below to submit your agriculture project for funding consideration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-4 border-b-2 border-green-200 pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter project title"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Provide a brief description of your project"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="City, State"
                />
              </div>

              <div>
                <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                  Sector *
                </label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a sector</option>
                  {SECTORS.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-4 border-b-2 border-green-200 pb-2">
              Project Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="production_capacity" className="block text-sm font-medium text-gray-700 mb-2">
                  Production Capacity (kg/day) *
                </label>
                <input
                  type="number"
                  id="production_capacity"
                  name="production_capacity"
                  value={formData.production_capacity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="land_area" className="block text-sm font-medium text-gray-700 mb-2">
                  Land Area *
                </label>
                <input
                  type="text"
                  id="land_area"
                  name="land_area"
                  value={formData.land_area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="e.g., 5 acres, 2 hectares"
                />
              </div>

              <div>
                <label htmlFor="employment_generated" className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Generated *
                </label>
                <input
                  type="number"
                  id="employment_generated"
                  name="employment_generated"
                  value={formData.employment_generated}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Number of jobs"
                />
              </div>

              <div>
                <label htmlFor="project_duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Duration (months) *
                </label>
                <input
                  type="number"
                  id="project_duration"
                  name="project_duration"
                  value={formData.project_duration}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Duration in months"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="infrastructure_details" className="block text-sm font-medium text-gray-700 mb-2">
                  Infrastructure Details *
                </label>
                <textarea
                  id="infrastructure_details"
                  name="infrastructure_details"
                  value={formData.infrastructure_details}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Describe the infrastructure requirements"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="technology_used" className="block text-sm font-medium text-gray-700 mb-2">
                  Technology Used *
                </label>
                <textarea
                  id="technology_used"
                  name="technology_used"
                  value={formData.technology_used}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Describe the technology and methods to be used"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-4 border-b-2 border-green-200 pb-2">
              Financial Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency *
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="estimated_cost" className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Cost ({formData.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {formData.currency === 'INR' ? '₹' : formData.currency === 'USD' ? '$' : ''}
                  </span>
                  <input
                    type="number"
                    id="estimated_cost"
                    name="estimated_cost"
                    value={formData.estimated_cost}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="funding_required" className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Required ({formData.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {formData.currency === 'INR' ? '₹' : formData.currency === 'USD' ? '$' : ''}
                  </span>
                  <input
                    type="number"
                    id="funding_required"
                    name="funding_required"
                    value={formData.funding_required}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="funding_type" className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Type *
                </label>
                <select
                  id="funding_type"
                  name="funding_type"
                  value={formData.funding_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select funding type</option>
                  {FUNDING_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="expected_revenue_year1" className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Revenue Year 1 ({formData.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {formData.currency === 'INR' ? '₹' : formData.currency === 'USD' ? '$' : ''}
                  </span>
                  <input
                    type="number"
                    id="expected_revenue_year1"
                    name="expected_revenue_year1"
                    value={formData.expected_revenue_year1}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="expected_revenue_year2" className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Revenue Year 2 ({formData.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {formData.currency === 'INR' ? '₹' : formData.currency === 'USD' ? '$' : ''}
                  </span>
                  <input
                    type="number"
                    id="expected_revenue_year2"
                    name="expected_revenue_year2"
                    value={formData.expected_revenue_year2}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="expected_revenue_year3" className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Revenue Year 3 ({formData.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {formData.currency === 'INR' ? '₹' : formData.currency === 'USD' ? '$' : ''}
                  </span>
                  <input
                    type="number"
                    id="expected_revenue_year3"
                    name="expected_revenue_year3"
                    value={formData.expected_revenue_year3}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-4 border-b-2 border-green-200 pb-2">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="promoter_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Promoter Name *
                </label>
                <input
                  type="text"
                  id="promoter_name"
                  name="promoter_name"
                  value={formData.promoter_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-4 border-b-2 border-green-200 pb-2">
              Project Objectives
            </h2>
            <div className="space-y-4">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder={`Objective ${index + 1}`}

                  />
                  {formData.objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeObjective(index)}
                      className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      aria-label="Remove objective"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addObjective}
                className="flex items-center gap-2 px-4 py-2 text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Objective
              </button>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-yellow-500 text-green-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl"
            >
              <Eye className="w-5 h-5" />
              Preview Project Summary
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Submit Project
                </>
              )}
            </button>
          </div>

          {submitSuccess && (
            <div className="p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-800 text-center font-semibold animate-pulse">
              Project submitted successfully!
            </div>
          )}
        </form>
      </div>
    </div>
    
{/* ---------------- RESULT DISPLAY ---------------- */}
{result && (
  <div className="bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-200">
    <h3 className="text-2xl font-semibold text-green-700 mb-4">📄 Generated Project Documents</h3>

    {result.message && (
      <p className="text-gray-700 mb-3">{result.message}</p>
    )}

    <div className="space-y-3">
      {result.docx && (
        <a
          href={`http://localhost:8000/${result.docx.replace(/\\/g, "/")}`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
        >
          <FileText className="w-5 h-5 text-blue-600" />
          Download DPR Document (.docx)
        </a>
      )}
     {console.log("Result object:", result)}
      {result.pdf_summary && (
        <a
          href={`http://localhost:8000/${result.pdf_summary.replace(/\\/g, "/")}`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
        >
          <FileDown className="w-5 h-5 text-red-600" />
          Download Project Summary (.pdf)
        </a>
      )}

      {result.excel_financials && (
        <a
          href={`http://localhost:8000/${result.excel_financials.replace(/\\/g, "/")}`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
        >
          <FileSpreadsheet className="w-5 h-5 text-green-600" />
          Download Financials (.xlsx)
        </a>
      )}
       {result.chart_image && (
        <a
          href={`http://localhost:8000/${result.chart_image.replace(/\\/g, "/")}`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
        >
          <LineChart className="w-5 h-5 text-green-600" />
          Download Chart (.png)
        </a>
      )}
    </div>
  </div>
)}

  </div>
  )}
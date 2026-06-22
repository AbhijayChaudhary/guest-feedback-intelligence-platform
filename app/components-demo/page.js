'use client';

import React, { useState } from 'react';
import { Button, Input, Modal, Toast, Loader } from '@/components/ui';

export default function ComponentsDemoPage() {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast States
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const showToast = (message, type) => {
    setToastConfig({ isVisible: true, message, type });
  };

  const closeToast = () => {
    setToastConfig((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">GuestBook UI Component Showcase</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Explore and test the reusable component library built for the GuestBook platform.</p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-l-4 border-blue-600 dark:border-blue-500 pl-4">Button Examples</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-8 transition-colors duration-300">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Variants</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="primary" disabled>Disabled Button</Button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Sizes</p>
              <div className="flex flex-wrap items-end gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-l-4 border-blue-600 dark:border-blue-500 pl-4">Input Examples</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 transition-colors duration-300">
            <Input 
              label="Full Name" 
              placeholder="e.g. John Doe" 
            />
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="john@example.com" 
            />
            <Input 
              label="Error State Example" 
              placeholder="Type something..." 
              error="This field is required and must be a valid entry."
            />
          </div>
        </section>

        {/* Modal Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-l-4 border-blue-600 dark:border-blue-500 pl-4">Modal Example</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Demo Modal
            </Button>
            
            <Modal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)}
              title="Review Summary Analysis"
            >
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  GuestBook AI has completed the analysis of the selected review. The sentiment is positive with high confidence.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 transition-colors duration-300">
                  <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">Key Observation</h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                    "Guests frequently praise the personalized breakfast service and the quick check-in process."
                  </p>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>Apply Suggestions</Button>
                </div>
              </div>
            </Modal>
          </div>
        </section>

        {/* Toast Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-l-4 border-blue-600 dark:border-blue-500 pl-4">Toast Notifications</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap gap-4 transition-colors duration-300">
            <Button variant="primary" onClick={() => showToast('Analysis completed successfully!', 'success')}>
              Show Success
            </Button>
            <Button variant="secondary" onClick={() => showToast('Unable to connect to server.', 'error')}>
              Show Error
            </Button>
            <Button variant="outline" onClick={() => showToast('Indexing new reviews...', 'info')}>
              Show Info
            </Button>
            
            <Toast 
              message={toastConfig.message}
              type={toastConfig.type}
              isVisible={toastConfig.isVisible}
              onClose={closeToast}
            />
          </div>
        </section>

        {/* Loader Section */}
        <section className="space-y-6 pb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-l-4 border-blue-600 dark:border-blue-500 pl-4">Loader (Spinners)</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-around transition-colors duration-300">
            <div className="text-center space-y-2">
              <Loader size="sm" />
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Small</p>
            </div>
            <div className="text-center space-y-2">
              <Loader size="md" />
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Medium</p>
            </div>
            <div className="text-center space-y-2">
              <Loader size="lg" />
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Large</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

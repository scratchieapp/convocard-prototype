import React, { useState } from 'react';
import { Camera, Mic, Users, Plus, Check, X, AlertTriangle } from 'lucide-react';

const ConvoCardCreation = () => {
  const [step, setStep] = useState(1);
  const [workType, setWorkType] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSafe, setIsSafe] = useState(null);
  
  const recentWorkTypes = [
    'Concrete Pour',
    'Steel Fixing',
    'Electrical Installation',
    'Painting'
  ];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">What work are you doing?</h2>
            <div className="grid grid-cols-2 gap-2">
              {recentWorkTypes.map((type) => (
                <button 
                  key={type}
                  onClick={() => {
                    setWorkType(type);
                    setStep(2);
                  }}
                  className="p-3 text-left border rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-500"
                >
                  {type}
                </button>
              ))}
            </div>
            <button 
              className="flex items-center justify-center w-full p-3 mt-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setStep(2)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Other Work Type
            </button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Capture work area</h2>
            <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {!hasPhoto ? (
                <button 
                  onClick={() => setHasPhoto(true)}
                  className="flex flex-col items-center p-4"
                >
                  <Camera className="w-8 h-8 mb-2 text-gray-500" />
                  <span className="text-sm text-gray-500">Take Photo</span>
                </button>
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg">
                  <img src="/api/placeholder/400/320" alt="Work area" className="w-full h-full object-cover rounded-lg" />
                </div>
              )}
            </div>
            {hasPhoto && (
              <button 
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Is it safe to start work?</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  setIsSafe(true);
                  setStep(4);
                }}
                className="p-4 border rounded-lg hover:bg-green-50 focus:ring-2 focus:ring-green-500 flex flex-col items-center"
              >
                <Check className="w-8 h-8 mb-2 text-green-500" />
                Yes, safe to start
              </button>
              <button 
                onClick={() => {
                  setIsSafe(false);
                  setStep(4);
                }}
                className="p-4 border rounded-lg hover:bg-red-50 focus:ring-2 focus:ring-red-500 flex flex-col items-center"
              >
                <X className="w-8 h-8 mb-2 text-red-500" />
                No, issues found
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Add optional details</h2>
            <div className="space-y-2">
              <button className="flex items-center w-full p-3 border rounded-lg hover:bg-gray-50">
                <Mic className="w-5 h-5 mr-2" />
                Add voice note (+3 points)
              </button>
              <button className="flex items-center w-full p-3 border rounded-lg hover:bg-gray-50">
                <Users className="w-5 h-5 mr-2" />
                Tag team members (+2 points)
              </button>
              <button className="flex items-center w-full p-3 border rounded-lg hover:bg-gray-50">
                <Camera className="w-5 h-5 mr-2" />
                Add more photos (+2 points each)
              </button>
            </div>
            <button 
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setStep(5)}
            >
              Submit Convo Card
            </button>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-lg font-bold">Convo Card Created!</h2>
            <p className="text-gray-500">+10 base points awarded</p>
            <button 
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setStep(1)}
            >
              Create Another
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-2 h-2 rounded-full ${
                step >= stepNumber ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        {step < 5 && (
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => step > 1 && setStep(step - 1)}
          >
            Back
          </button>
        )}
      </div>
      {renderStep()}
    </div>
  );
};

export default ConvoCardCreation;
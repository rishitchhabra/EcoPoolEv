import { useState } from 'react';
import { Save, Check } from 'lucide-react';
import clsx from 'clsx';

export default function Accessibility() {
  const [preferences, setPreferences] = useState({
    mobility: {
      wheelchairRamp: true,
      lowFloor: false,
      extraLegroom: false,
      storageSpace: true
    },
    assistance: {
      driverHelp: true,
      doorToDoor: false,
      luggageHelp: false
    },
    sensory: {
      quietRide: false,
      minimalScents: true,
      screenReader: true
    }
  });

  const [saved, setSaved] = useState(false);

  const toggle = (category, key) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderSection = (title, category, items) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(items).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggle(category, key)}
            className={clsx(
              "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
              preferences[category][key]
                ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                : "bg-white border-gray-200 hover:border-gray-300"
            )}
          >
            <span className={clsx("font-medium", preferences[category][key] ? "text-emerald-900" : "text-gray-700")}>
              {label}
            </span>
            <div className={clsx(
              "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
              preferences[category][key] ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
            )}>
              {preferences[category][key] && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Accessibility Preferences</h1>
        <p className="text-gray-600">Customize your ride experience. We'll prioritize vehicles that match your specific needs.</p>
      </div>

      <div className="space-y-6">
        {renderSection('Mobility Requirements', 'mobility', {
          wheelchairRamp: 'Wheelchair Ramp / Lift',
          lowFloor: 'Low Floor Entry',
          extraLegroom: 'Extra Legroom',
          storageSpace: 'Mobility Aid Storage'
        })}

        {renderSection('Driver Assistance', 'assistance', {
          driverHelp: 'Boarding Assistance',
          doorToDoor: 'Door-to-Door Escort',
          luggageHelp: 'Luggage/Equipment Help'
        })}

        {renderSection('Sensory & Environment', 'sensory', {
          quietRide: 'Quiet Ride (No Music)',
          minimalScents: 'Scent-Free Vehicle',
          screenReader: 'Screen Reader Compatible App'
        })}
      </div>

      <div className="sticky bottom-6 flex justify-center">
        <button
          onClick={handleSave}
          className={clsx(
            "flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105",
            saved ? "bg-green-600 text-white" : "bg-gray-900 text-white hover:bg-black"
          )}
        >
          {saved ? <Check size={20} /> : <Save size={20} />}
          {saved ? 'Preferences Saved' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}

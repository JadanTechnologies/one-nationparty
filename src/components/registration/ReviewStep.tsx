import { useFormContext } from 'react-hook-form';
import { User, MapPin, ShieldCheck, Mail, Phone, Calendar, Briefcase } from 'lucide-react';

export function ReviewStep() {
  const { getValues } = useFormContext();
  const values = getValues();

  const SummaryItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start space-x-3">
      <div className="mt-1 p-1.5 bg-gray-50 rounded-md text-gray-400">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-gray-900 font-medium">{value || 'Not provided'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Review Your Information</h3>
        <p className="text-gray-500 text-sm">Please double-check all details before final submission.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Personal Details */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Details
          </h4>
          <div className="space-y-4">
            <SummaryItem icon={User} label="Full Name" value={values.fullName} />
            <SummaryItem icon={Mail} label="Email Address" value={values.email} />
            <SummaryItem icon={Phone} label="Phone Number" value={values.phone} />
            <SummaryItem icon={Calendar} label="Date of Birth" value={values.dob} />
            <SummaryItem icon={Briefcase} label="Occupation" value={values.occupation} />
          </div>
        </div>

        {/* Location & ID */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Registration Location
            </h4>
            <div className="space-y-4">
              <SummaryItem icon={MapPin} label="State / LGA" value={`${values.state}, ${values.lga}`} />
              <SummaryItem icon={MapPin} label="Ward / Polling Unit" value={`${values.ward} / ${values.pollingUnit}`} />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Verification
            </h4>
            <div className="space-y-4">
              <SummaryItem icon={ShieldCheck} label="NIN" value={values.nin} />
              <SummaryItem icon={ShieldCheck} label="Voter's ID" value={values.voterId} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
        <p className="text-sm text-amber-800 leading-relaxed text-center italic">
          "By submitting this form, I affirm that the information provided is accurate and I pledge my loyalty to the principles and manifesto of the African Democratic Congress."
        </p>
      </div>
    </div>
  );
}

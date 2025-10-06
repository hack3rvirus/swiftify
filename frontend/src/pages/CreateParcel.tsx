import React, { useState } from 'react';
import { supabase, uploadFile } from '../lib/supabase';
import toast from 'react-hot-toast';

const CreateParcel: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [value, setValue] = useState<number | ''>('');
  const [instructions, setInstructions] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let photoUrl = null;
    if (photoFile) {
      photoUrl = await uploadFile(photoFile);
      if (!photoUrl) {
        toast.error('Failed to upload photo');
        setSubmitting(false);
        return;
      }
    }

    const parcelData = {
      sender: {
        name: senderName,
        email: senderEmail,
        phone: senderPhone,
        address: senderAddress,
      },
      receiver: {
        name: receiverName,
        email: receiverEmail,
        phone: receiverPhone,
        address: receiverAddress,
      },
      parcel_details: {
        description,
        weight,
        dimensions: {
          length: length || 0,
          width: width || 0,
          height: height || 0,
        },
        value: value || 0,
        instructions,
        photo: photoUrl,
      },
      status: 'pending',
      mode: 'manual',
      history: [],
      route: [],
      eta: '',
      created_at: new Date().toISOString(),
      progress: 0,
    };

    try {
      if (!supabase) {
        toast.error('Database connection not available');
        setSubmitting(false);
        return;
      }

      const response = await supabase
        .from('parcels')
        .insert([parcelData]);

      if (response.error) {
        toast.error('Failed to create parcel: ' + response.error.message);
      } else {
        toast.success('Parcel created successfully');
        // Reset form
        setSenderName('');
        setSenderEmail('');
        setSenderPhone('');
        setSenderAddress('');
        setReceiverName('');
        setReceiverEmail('');
        setReceiverPhone('');
        setReceiverAddress('');
        setDescription('');
        setWeight('');
        setLength('');
        setWidth('');
        setHeight('');
        setValue('');
        setInstructions('');
        setPhotoFile(null);
      }
    } catch (err) {
      toast.error('Unexpected error: ' + (err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Parcel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <legend className="font-semibold">Sender Information</legend>
          <input
            type="text"
            placeholder="Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Address"
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
            required
            className="input"
          />
        </fieldset>

        <fieldset>
          <legend className="font-semibold">Receiver Information</legend>
          <input
            type="text"
            placeholder="Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Address"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            required
            className="input"
          />
        </fieldset>

        <fieldset>
          <legend className="font-semibold">Parcel Details</legend>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea"
          />
          <input
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            className="input"
          />
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Length"
              value={length}
              onChange={(e) => setLength(e.target.value === '' ? '' : Number(e.target.value))}
              className="input flex-1"
            />
            <input
              type="number"
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
              className="input flex-1"
            />
            <input
              type="number"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
              className="input flex-1"
            />
          </div>
          <input
            type="number"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))}
            className="input"
          />
          <textarea
            placeholder="Special Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="textarea"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="input"
          />
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          {submitting ? 'Submitting...' : 'Create Parcel'}
        </button>
      </form>
    </div>
  );
};

export default CreateParcel;

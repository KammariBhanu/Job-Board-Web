import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUserStore } from '@/lib/store';

export default function Profile() {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Full Stack Developer',
    bio: 'Passionate about building great products and solving complex problems.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/40">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm mb-1 block">Full Name</Label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label className="text-sm mb-1 block">Professional Title</Label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold">{formData.name}</h2>
                      <p className="text-muted-foreground">{formData.title}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    {isEditing ? (
                      <div className="flex-1">
                        <Label className="text-sm mb-1 block">Email</Label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    {isEditing ? (
                      <div className="flex-1">
                        <Label className="text-sm mb-1 block">Phone</Label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    {isEditing ? (
                      <div className="flex-1">
                        <Label className="text-sm mb-1 block">Location</Label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{formData.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold mb-4">About</h3>
                {isEditing ? (
                  <div>
                    <Label className="text-sm mb-1 block">Bio</Label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={(e) => handleChange(e as any)}
                      className="w-full px-4 py-2 rounded-lg border border-border/40 bg-background focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                      rows={4}
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground">{formData.bio}</p>
                )}
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="p-8">
              <h3 className="text-lg font-semibold mb-6">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/40">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive job recommendations and updates</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/40">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/40">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-muted-foreground">Make your profile visible to employers</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

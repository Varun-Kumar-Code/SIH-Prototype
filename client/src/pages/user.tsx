import { useState } from "react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Package, ShoppingBag } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocation } from "wouter";

export default function UserProfile() {
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: "https://imgs.search.brave.com/6sZRHCMMvfkvvYz9DA2pEU6KiPUo_ujBE-3bx41bjxo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci8yMDAv/MTAxMC9IRC13YWxs/cGFwZXItc3VzaGFu/dC1pcy1sZWFuaW5n/LWJhY2stb24td2Fs/bC13ZWFyaW5nLWJs/YWNrLW92ZXJjb2F0/LXN1c2hhbnQtc2lu/Z2gtcmFqcHV0LXRo/dW1ibmFpbC5qcGc",
    banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    name: "Varun Kumar R",
    email: "enquiretovarun@gmail.com",
    phone: "+91 9003469343",
    address: "123 Main Street",
    city: "New York",
    country: "United States"
  });

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save functionality
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo(prev => ({ ...prev, banner: imageUrl }));
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">User Profile</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>
          </div>

          {/* Profile Banner Upload */}
          <div className="relative mb-6">
            <label htmlFor="banner-upload" className="cursor-pointer block">
              <div className="relative w-full h-48 md:h-64 lg:h-72 rounded-xl overflow-hidden border-2 border-border hover:border-primary/40 transition-colors bg-gradient-to-r from-primary/10 to-primary/5">
                <img
                  src={userInfo.banner}
                  alt="Profile Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl md:text-2xl font-bold">{userInfo.name}</h2>
                  <p className="text-sm md:text-base opacity-90">Welcome to your profile</p>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="banner-upload"
              className="hidden"
              accept="image/*"
              onChange={handleBannerUpload}
            />
          </div>

        <div className="space-y-6">
          {/* Profile Image Upload - Positioned relative to banner */}
          <div className="flex justify-center -mt-14 mb-6">
            <div className="relative">
              <label htmlFor="profile-upload" className="cursor-pointer block">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-lg hover:shadow-xl transition-shadow bg-background">
                  <img
                    src={userInfo.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </label>
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={userInfo.name}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={userInfo.email}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  value={userInfo.phone}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Address Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Address</label>
                <Textarea
                  value={userInfo.address}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={userInfo.city}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={userInfo.country}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({ ...userInfo, country: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate("/order/25436")}
              >
                <Package className="w-4 h-4" />
                Your Orders
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate("/")}
              >
                <ShoppingBag className="w-4 h-4" />
                Keep Shopping
              </Button>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-background hover:bg-muted border-input transition-colors"
              >
                <MapPin className="w-4 h-4" />
                View on Map
              </a>
            </div>
          </Card>
        </div>
      </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

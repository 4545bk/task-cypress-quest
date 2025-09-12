import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Group member details
const groupMembers = [
  { name: "Natnael Gizaw", id: "ATE/6967/13" },
  { name: "Tamene Behailu", id: "ATE/3052/13" },
  { name: "Tamrat Hordofa", id: "ATE/6788/13" },
  { name: "Sirak Abera", id: "ATE/7251/13" },
  { name: "Yosef Demis", id: "ATE/6444/13" },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 flex justify-center items-center p-4 py-8 font-inter">
        {/* Wrapper for Task Manager and group members cards */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full max-w-4xl lg:max-w-5xl">
          {/* Task Manager Content */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full md:w-3/5 lg:w-2/3 border border-gray-700 relative overflow-hidden flex-shrink-0">
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 bg-white opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M9 0H6a3 3 0 0 0 3 3v3H0V3a3 3 0 0 1 3-3h3zM3 9a3 3 0 0 0 3-3v3H0V6a3 3 0 0 1 3 3z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <div className="relative z-10">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>

          {/* Group Members Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full md:w-2/5 lg:w-1/3 border border-gray-700 relative overflow-hidden flex-shrink-0 mt-8 md:mt-0">
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 bg-white opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M9 0H6a3 3 0 0 0 3 3v3H0V3a3 3 0 0 1 3-3h3zM3 9a3 3 0 0 0 3-3v3H0V6a3 3 0 0 1 3 3z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-6">
                <img
                  src="/logo.png"
                  alt="University Logo"
                  className="mx-auto h-24 w-24 rounded-full border-2 border-blue-400 shadow-lg object-contain"
                  onError={(e) => {
                    console.error("Logo failed to load, switching to placeholder");
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/96x96/60A5FA/FFFFFF?text=Logo";
                  }}
                  onLoad={() => console.log("Logo loaded successfully")}
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-300 mb-4">Addis Ababa Institute of Technology</h2>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">School of Information Technology and Engineering</h3>
              <p className="text-lg text-gray-400 mb-4">Department of Software Engineering</p>
              <p className="text-2xl font-extrabold text-blue-400 mb-6 border-b border-gray-600 pb-3">Software Testing, Verification and Quality Assurance(SQAT) Assignment</p>

              <h2 className="text-3xl font-bold text-blue-300 mb-6">Group Members</h2>
              <ul className="space-y-3 text-lg">
                {groupMembers.map((member, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-3 rounded-md shadow-inner border border-gray-600"
                  >
                    <span className="text-gray-200 font-medium">{member.name}</span>
                    <span className="text-gray-400 font-mono">{member.id}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
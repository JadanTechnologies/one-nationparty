import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, TrendingUp, CheckCircle, Clock, AlertTriangle, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const MOCK_REGISTRATIONS = [
  { id: '1', name: 'Chukwuma Obi', state: 'Anambra', status: 'Approved', date: '2026-04-22', type: 'Member' },
  { id: '2', name: 'Fatima Ahmed', state: 'Kano', status: 'Pending', date: '2026-04-21', type: 'Delegate' },
  { id: '3', name: 'Olusegun Adeleke', state: 'Lagos', status: 'Pending', date: '2026-04-21', type: 'Aspirant' },
  { id: '4', name: 'Ngozi Okoro', state: 'Enugu', status: 'Approved', date: '2026-04-20', type: 'Member' },
  { id: '5', name: 'Ibrahim Shehu', state: 'Kaduna', status: 'Rejected', date: '2026-04-20', type: 'Member' },
  { id: '6', name: 'Abubakar Tukur', state: 'Sokoto', status: 'Approved', date: '2026-04-19', type: 'Member' },
  { id: '7', name: 'Blessing Udoh', state: 'Akwa Ibom', status: 'Pending', date: '2026-04-19', type: 'Member' },
  { id: '8', name: 'David Adeleke', state: 'Osun', status: 'Approved', date: '2026-04-18', type: 'Delegate' },
  { id: '9', name: 'Grace Oladipo', state: 'Oyo', status: 'Approved', date: '2026-04-18', type: 'Member' },
  { id: '10', name: 'Hamza Yusuf', state: 'Bauchi', status: 'Rejected', date: '2026-04-17', type: 'Member' },
  { id: '11', name: 'Zainab Bello', state: 'Kwara', status: 'Approved', date: '2026-04-17', type: 'Member' },
  { id: '12', name: 'Efe Omorogbe', state: 'Edo', status: 'Pending', date: '2026-04-16', type: 'Aspirant' },
  { id: '13', name: 'Kelechi Iheanacho', state: 'Imo', status: 'Approved', date: '2026-04-16', type: 'Member' },
  { id: '14', name: 'Aishat Mohammed', state: 'Borno', status: 'Approved', date: '2026-04-15', type: 'Member' },
  { id: '15', name: 'Timothy Sunday', state: 'Delta', status: 'Pending', date: '2026-04-15', type: 'Member' },
  { id: '16', name: 'Funke Akindele', state: 'Ogun', status: 'Approved', date: '2026-04-14', type: 'Delegate' },
  { id: '17', name: 'Mustapha Gidado', state: 'Adamawa', status: 'Approved', date: '2026-04-14', type: 'Member' },
  { id: '18', name: 'Victoria Bassey', state: 'Cross River', status: 'Rejected', date: '2026-04-13', type: 'Member' },
  { id: '19', name: 'Samuel Adepoju', state: 'Ekiti', status: 'Approved', date: '2026-04-13', type: 'Member' },
  { id: '20', name: 'Amina Lawal', state: 'Katsina', status: 'Pending', date: '2026-04-12', type: 'Member' },
  { id: '21', name: 'Joy Chima', state: 'Abia', status: 'Approved', date: '2026-04-12', type: 'Member' },
  { id: '22', name: 'Sadiq Umar', state: 'Plateau', status: 'Approved', date: '2026-04-11', type: 'Member' },
];

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const filteredRegistrations = useMemo(() => {
    return MOCK_REGISTRATIONS.filter(reg => 
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredRegistrations, currentPage]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Real-time statistics for OneNation Party membership registration</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-12">Export Data</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl">Refresh Stats</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Registrations', value: '124,592', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Approved Today', value: '1,204', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Review', value: '452', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Rejection Rate', value: '2.4%', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' }
        ].map((stat, i) => (
          <Card key={i} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Registrations Table */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7 border-b border-gray-50 mb-4">
          <CardTitle className="text-xl font-bold">Recent Registrations</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search members..." 
                className="pl-10 h-10 w-[240px] rounded-lg" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-gray-50">
                <TableHead className="font-bold">Member Name</TableHead>
                <TableHead className="font-bold">State</TableHead>
                <TableHead className="font-bold">Type</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((reg) => (
                <TableRow key={reg.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-medium">{reg.name}</TableCell>
                  <TableCell>{reg.state}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium bg-gray-50">{reg.type}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{reg.date}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-bold",
                      reg.status === 'Approved' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                      reg.status === 'Pending' ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                      "bg-rose-100 text-rose-700 hover:bg-rose-100"
                    )}>
                      {reg.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="font-bold text-emerald-600 hover:text-emerald-700">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredRegistrations.length)}</span> of <span className="font-bold text-gray-900">{filteredRegistrations.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-lg"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    className={cn(
                      "h-9 w-9 rounded-lg font-bold",
                      currentPage === page ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20" : "text-gray-500"
                    )}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-lg"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

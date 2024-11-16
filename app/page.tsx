/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react";
import data from "./data";
import {
  Table,
  TableBody,

  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Building2, Globe, Mail, Phone, Link, Flag, Building, FunctionSquare, Plus, Minus, Search } from "lucide-react"
import { Button } from "@/components/ui/button";
import { supabase } from "./client";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tableData, setTableData] = useState(data)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const dataPerPage: number = 10;
  const startIndex = (page - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  
  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("DataEntry").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setTableData(data || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    if (endIndex < tableData.length) {
      setPage(page + 1)
    }
  }
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTableData(filteredData);
  };

  const addIndb = async (entry: any) => {
    try {
      const { data, error } = await supabase.from("DataEntry").upsert([entry]).select();
      if (error) {
        console.error("Error adding data:", error);
        alert(error)
      } else {
        console.log("Data added:", data);
        alert("Data added Successfully")
        fetchData(); // Refresh the data
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  const deleteFromDb = async (domain: string) => {
    try {
      const { data, error } = await supabase.from("DataEntry").delete().match({ domain });
      if (error) {
        console.error("Error deleting data:", error);
        alert(error)
      } else {
        console.log("Data deleted:", data);
        fetchData(); // Refresh the data
        alert("deleted")
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="p-6 text-center">
      <div className="mb-8 flex items-center justify-center gap-2">
        <Building className="h-7 w-7 text-gray-400" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-200">Company Directory</h1>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 my-4 text-center border-2 border-white ">
        <div className="flex align-middle gap-6 justify-between">

          <Input type="text" id="text" placeholder="Search By Name" value={search} onChange={handleSearchChange} />
          <Search />
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800/50 border-gray-800 text-center">
              <TableHead className="w-[140px] text-gray-300 text-center">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Domain</span>
                </div>
              </TableHead>
              <TableHead className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Name</span>
                </div>
              </TableHead>
              <TableHead className="text-gray-300 text-center w-[100px]">
                <span className="font-medium">Score</span>
              </TableHead>
              <TableHead className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Email</span>
                </div>
              </TableHead>
              <TableHead className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Phone</span>
                </div>
              </TableHead>
              <TableHead className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">URL</span>
                </div>
              </TableHead>
              <TableHead className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Country</span>
                </div>
              </TableHead>
              <TableHead className="text-gray-300 text-center" colSpan={2}>
                <div className="flex items-center gap-2">
                  <FunctionSquare className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Function</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((element) => (
              <TableRow key={element.domain} className="hover:bg-gray-800/50 border-gray-800">
                <TableCell className="font-medium text-gray-300">{element.domain}</TableCell>
                <TableCell className="text-gray-400">{element.name}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center justify-center w-12 h-8 rounded-full font-medium ${element.score >= 80 ? 'bg-green-900/50 text-green-400' :
                      element.score >= 50 ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-red-900/50 text-red-400'
                    }`}>
                    {element.score}
                  </span>
                </TableCell>
                <TableCell>
                  <a href={`mailto:${element.public_email}`} className="text-blue-400 hover:text-blue-300 hover:underline">
                    {element.public_email}
                  </a>
                </TableCell>
                <TableCell className="text-gray-400">{element.phones}</TableCell>
                <TableCell>
                  <a href={element.url} target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline max-w-[200px] truncate block">
                    {element.url}
                  </a>
                </TableCell>
                <TableCell className="text-gray-400">{element.country}</TableCell>
                <TableCell><Button onClick={() => addIndb(element)}><Plus />Add</Button></TableCell>
                <TableCell><Button onClick={() => deleteFromDb(element.domain)}><Minus />Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pagination flex justify-between mt-4">
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
        disabled={endIndex >= tableData.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
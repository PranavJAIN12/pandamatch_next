"use client"
import { useState } from "react";
import data from "./data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Building2, Globe, Mail, Phone, Link, Flag, Building } from "lucide-react"

export default function Home() {
  const [tableData, setTableData] = useState(data)
  
  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-center gap-2">
        <Building className="h-7 w-7 text-gray-400" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-200">Company Directory</h1>
      </div>

      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800/50 border-gray-800">
              <TableHead className="w-[140px] text-gray-300">
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((element) => (
              <TableRow key={element.domain} className="hover:bg-gray-800/50 border-gray-800">
                <TableCell className="font-medium text-gray-300">{element.domain}</TableCell>
                <TableCell className="text-gray-400">{element.name}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center justify-center w-12 h-8 rounded-full font-medium ${
                    element.score >= 80 ? 'bg-green-900/50 text-green-400' :
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
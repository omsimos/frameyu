import Image from "next/image";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { cache } from "react";

const getFrames = cache(async () => {
  const { session } = await getSession();

  return await prisma.frame.findMany({
    where: {
      userId: session?.userId,
    },
  });
});

export async function Frames() {
  const framesData = await getFrames();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Frames</CardTitle>
        <CardDescription>
          Manage your framesData and view their reach performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Visits</TableHead>
              <TableHead className="hidden md:table-cell">Downloads</TableHead>
              <TableHead className="hidden md:table-cell">
                Date Created
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {framesData.map((frame) => (
              <TableRow key={frame.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={frame.imgUrl}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{frame.title}</TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">812</TableCell>
                <TableCell className="hidden md:table-cell">25</TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(frame.createdAt, "PPP")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/*
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
      */}
    </Card>
  );
}

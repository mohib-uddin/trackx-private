"use client";
import React, {useMemo} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import {Spinner} from "@nextui-org/spinner";
import HRService from "@/services/hr/hr.service";
import {Pagination} from "@nextui-org/pagination";

const limit = 10;
export default function App() {
    const [page, setPage] = React.useState(1);
    const {useFetchAllEmployees}=HRService();

    const {data, isLoading} = useFetchAllEmployees(true,page,limit);


    const pages = useMemo(() => {
        return data?.length ? Math.ceil(data.length / limit) : 0;
    }, [data?.length, limit]);

    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

    return (
        <Table
            aria-label="Example table with client async pagination"
            bottomContent={
                pages > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                ) : null
            }
        >
            <TableHeader>
                <TableColumn key="firstName">Name</TableColumn>
                <TableColumn key="lastName">Height</TableColumn>
                <TableColumn key="mass">Mass</TableColumn>
                <TableColumn key="birth_year">Birth year</TableColumn>
            </TableHeader>
            <TableBody
                items={data ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

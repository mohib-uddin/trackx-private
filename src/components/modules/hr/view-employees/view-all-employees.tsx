
"use client";
import React, {useMemo} from "react";
import HRService from "@/services/hr/hr.service";
import BaseHeader from "@/components/common/header/base-header";
import {DeleteIcon, EditIcon, EyeIcon} from "@nextui-org/shared-icons";
import {Chip} from "@nextui-org/chip";
import {Tooltip} from "@nextui-org/tooltip";
import {User} from "@nextui-org/user";
import BaseTable from "@/components/common/tables/base-table";
import {employeeData} from "@/_utils/data/tables/employees";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {Button} from "@nextui-org/button";



const limit = 10;
const statusColorMap = {
    lead: "success",
    intern: "danger",
    vacation: "warning",
};

export default function ViewAllEmployees() {
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{radius: "lg", src: user.avatar}}
                        description={user.email}
                        name={`${user.firstName}${user.lastName}`}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{user.designation}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.department}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const [page, setPage] = React.useState(1);
    const {useFetchAllEmployees}=HRService();

    const {data, isLoading} = useFetchAllEmployees(true,page,limit);


    const pages = useMemo(() => {
        return data?.length ? Math.ceil(data.length / limit) : 0;
    }, [data?.length, limit]);

    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";


    return (
        <div className={'flex flex-col justify-center'}>
            <BaseHeader title={'View Employees'}/>
            <BaseTable topContent={topContent} pages={pages} page={page} setPage={setPage} data={employeeData} loadingState={loadingState} renderCell={renderCell}/>
        </div>

    );
}

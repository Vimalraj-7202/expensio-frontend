"use client";
import React from "react";
import CommonCard from "@/app/common/CommonCard";
import CommonButton from "@/app/common/CommonButton";
import CommonTitle from "@/app/common/CommonTitle";
import Stack from "@mui/material/Stack";


const Page = () => {
  const sampleItems = [
    { name: "Groceries" },
    { name: "Electricity Bill" },
    { name: "Netflix Subscription" },
  ];

  const handleEdit = (itemName: string) => {
    console.log("Edit clicked for:", itemName);
  };

  const handleDelete = (itemName: string) => {
    console.log("Delete clicked for:", itemName);
  };

  return (
    <>
    <CommonTitle title="Admin Panel" subTitle="You can add,remove,users "/>
    <Stack spacing={2} p={2}>
      {sampleItems.map((item, index) => (
        <CommonCard
          key={index}
          item={item}
          onEdit={() => handleEdit(item.name)}
          onDelete={() => handleDelete(item.name)}
        />
      ))}

      <CommonButton label="save" onClick={() => window.alert('you clicked save button')} />
      <CommonButton label="edit" onClick={() => window.alert('you clicked edit button')} />
      <CommonButton label="delete" onClick={() => window.alert('you clicked delete button')} />
    </Stack>

    </>
  );
};

export default Page;

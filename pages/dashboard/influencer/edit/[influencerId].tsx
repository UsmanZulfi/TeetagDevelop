import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Influencer } from "@/dashboard/lib/types/dashboardTypes";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  getInfluencerInfo,
  updateInfluencer,
} from "@/website/lib/networkCalls/dashboard/userDetails";
import { uploadFile } from "@/website/lib/networkCalls/formFunctions";
import { stateOptions } from "@/website/lib/types/common";

import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Toaster } from "react-hot-toast";

interface IParams extends ParsedUrlQuery {
  influencerId: string;
}

interface influencerInfoProps {
  influencer: Influencer;
}

const Editinfluencer = ({ influencer }: influencerInfoProps) => {
  const [formValues, setformValues] = useState({
    name: influencer?.name,
    email: influencer?.email,
    phone: influencer?.phone,
    state: stateOptions.find((s) => s.label == influencer?.state)?.value,
    age: influencer?.age,
    loss: influencer?.reason,
  });
  function handleChange(e: any): void {
    e.target.value;
    setformValues({
      name: e.target.name == "name" ? e.target.value : formValues.name,
      email: e.target.name == "email" ? e.target.value : formValues.email,
      phone: e.target.name == "phone" ? e.target.value : formValues.phone,
      state:
        e.target.name == "state"
          ? stateOptions.find((s) => s.value == e.target.value).value
          : formValues.state,
      age: e.target.name == "age" ? e.target.value : formValues.age,
      loss: e.target.name == "loss" ? e.target.value : formValues.loss,
    });
  }
  async function updateData() {
    const updatedData = {
      name: formValues.name,
      state: stateOptions.find((s) => s.value == formValues.state).value,
      age: formValues.age,
      ...(file && { image: (await uploadFile(file)).result.url }),
    };
    const response = updateInfluencer(influencer.id, updatedData);
    response.then((res) => {
      handleStatus(res);
    });
  }

  const [file, setFile] = useState<FileWithPath | null>(null);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      const fileWithPath = acceptedFiles[0];
      setFile(fileWithPath);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });
  return (
    <>
      <Toaster />
      <TitleHead
        title="influencer Info"
        metaTitle="influencer info"
        metaDesc="influencers"
      />
      <InnerHeader title="Edit influencer" />
      <div className="grid gap-10 mt-12 grid-cols-12">
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name here"
            defaultValue={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={formValues.email}
            readOnly
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter Phone"
            value={formValues.phone}
            readOnly
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            State
          </label>
          <select
            name="state"
            id="state"
            defaultValue={formValues?.state}
            onChange={handleChange}
          >
            {stateOptions.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Age
          </label>
          <input
            type="text"
            name="age"
            id="age"
            placeholder="Enter Age"
            defaultValue={formValues.age}
            onChange={handleChange}
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Loss
          </label>
          <input
            type="text"
            name="loss"
            id="loss"
            placeholder="Enter Loss"
            defaultValue={formValues.loss}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-12 mr-12">
          <p className="mt-10 mb-6 capitalize h8 font-fugaz text-green-light">
            Upload Image
          </p>
          <div {...getRootProps({ className: "teetag__dropzone " })}>
            <input {...getInputProps()} />
            {file ? (
              <p className="h8">{file.name}</p>
            ) : (
              <p className="h8 cursor-pointer">Drag & drop or upload</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-12 mt-12 grid-cols-12">
        <button
          type="submit"
          className="btn-teetag yellow text-center col-span-12 sm:col-span-6 lg:col-span-3"
          onClick={() => {
            updateData();
          }}
        >
          Save
        </button>
        <button
          type="submit"
          className="btn-teetag green text-center col-span-12 sm:col-span-6 lg:col-span-3"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default Editinfluencer;

Editinfluencer.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { influencerId } = context.params as IParams;
  try {
    const influencer = await getInfluencerInfo(influencerId);
    return {
      props: {
        influencer: influencer.data.result.influencer,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

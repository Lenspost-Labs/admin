import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import React from "react";
import StepUploadToS3 from "./steps/StepUploadToS3";
import StepUploadToDB from "./steps/StepUploadToDB";
import StepSetMetadata from "./steps/StepSetMetadata";

const OneStepUpload = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <div className="m-8">
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Upload files to S3" description="Choose files to upload">
            <StepUploadToS3 />
          </Stepper.Step>
          <Stepper.Step label="Set Metadata" description="Set metadata for the assets">
            <StepSetMetadata/>
          </Stepper.Step>
          <Stepper.Step label="Upload to DB" description="Upload to Database">
            <StepUploadToDB />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </div>
    </>
  );
};

export default OneStepUpload;

import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import React from "react";

const OneStepUpload = () => {
  const [active, setActive] = useState(1);
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
          <Stepper.Step label="Upload files to S3" description="">
            Step 1 content: Create an account
          </Stepper.Step>
          <Stepper.Step label="Set Metadata" description="">
            Step 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step label="Upload to DB" description="Get full access">
            Step 3 content: Get full access
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

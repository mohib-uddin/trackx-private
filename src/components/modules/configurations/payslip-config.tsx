import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Radio, RadioGroup } from "@nextui-org/radio";

const PayslipConfig = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className={"font-[700] text-xl"}>PaySlip Configuration</h2>
      </CardHeader>
      <CardBody>
        <RadioGroup label="Logo Position" orientation="horizontal">
          <Radio value="buenos-aires">Center</Radio>
          <Radio value="sydney">Left</Radio>
          <Radio value="san-francisco">Right</Radio>
          <Radio value="london">None</Radio>
        </RadioGroup>
        <div className={"my-5"}>
          <Button color={"primary"}>Save Changes</Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default PayslipConfig;

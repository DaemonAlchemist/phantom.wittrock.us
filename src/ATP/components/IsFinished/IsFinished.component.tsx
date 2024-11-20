import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { IsFinishedProps } from "./IsFinished";

export const IsFinishedComponent = ({value}:IsFinishedProps) =>
    <Typography.Text type={!value ? "danger" : "success"}>
        {!!value ? <CheckOutlined /> : <CloseOutlined />}
    </Typography.Text>;

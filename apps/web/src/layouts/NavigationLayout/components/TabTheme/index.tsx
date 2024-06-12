import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useDesignSystem } from "@web/designSystem";
import { LightTheme } from "@web/designSystem/theme/theme";
import { Button } from "antd";

export const TabTheme: React.FC = () => {

    const  {toggleTheme, theme} = useDesignSystem()

    return (
            <Button onClick={toggleTheme}
             shape="circle"
             icon={ theme == LightTheme ? <MoonOutlined /> : <SunOutlined/>} ></Button>
    )
}
    
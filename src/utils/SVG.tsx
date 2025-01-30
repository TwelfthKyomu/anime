import { iconMap, IconNameT } from "@/types/icon";

type SVGProps = {
    name: IconNameT;
};

const SVG = ({name}: SVGProps) => {
    const Icon = iconMap[name];
    return Icon ? <Icon /> : null;
};

export default SVG;
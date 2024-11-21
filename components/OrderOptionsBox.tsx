export interface OrderOptionsBoxProps {
  guid: string;
  title: string;
  description: string;
  items: any;
  key: any;
  isRequired: boolean;
  setIsRequiredSatisfied: any;
  isCheckbox: boolean;
  onSelect: any;
}

export default function OrderOptionsBox({
  guid,
  title,
  description,
  items,
  key,
  isRequired,
  setIsRequiredSatisfied,
  isCheckbox,
  onSelect,
}: OrderOptionsBoxProps) {
  return <div />;
}

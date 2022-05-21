import React, { useState } from "react";
import { Checkbox as DefaultCheckbox } from "antd";

function Checkbox({
  id,
  completed,
  toggleComplete,
}: {
  id: string;
  completed: boolean;
  toggleComplete: Function;
}) {
  const [isChecked, setIsChecked] = useState(completed);
  return (
    <DefaultCheckbox
      checked={isChecked}
      onChange={(e) => {
        toggleComplete(id, e.target.checked);
        setIsChecked(e.target.checked);
      }}
    />
  );
}

export default Checkbox;

import { useState, useEffect } from "react";
import { useCheck } from "./hooks/useCheck";
const checkList = [
  {
    name: "Lorem",
    id: "KZtObICZaU++Hnu0dFe6vQ==",
    checked: false,
    disabled: false,
  },
  {
    name: "ipsum",
    id: "sdIqurVtDE2IXr6fQtf0Ug==",
    checked: false,
    disabled: false,
  },
  {
    name: "dolor",
    id: "O4oXoFlGgU2V+HUBYlw6Sg==",
    checked: false,
    disabled: false,
  },
  {
    name: "sit",
    id: "5p3Q9KSu+Uymefrs1plQpw==",
    checked: false,
    disabled: true,
  },
  {
    name: "amet",
    id: "TF2pVWVY6EOLOP51uwuk6g==",
    checked: false,
    disabled: false,
  },
  {
    name: "consectetur",
    id: "bvJuNf3K8kGCxZqzQTzhuQ==",
    checked: false,
    disabled: false,
  },
  {
    name: "adipiscing",
    id: "XoLLMvfnVEafKlaRO4zjBQ==",
    checked: false,
    disabled: false,
  },
  {
    name: "elit",
    id: "/MRz24Ae+0Gxu1/7gtCF2g==",
    checked: false,
    disabled: true,
  },
  {
    name: "sed",
    id: "SfaMdBkYfESamTxEmXgVfA==",
    checked: false,
    disabled: false,
  },
  {
    name: "do",
    id: "pdMZntKFxkmvFMXSZmLepQ==",
    checked: false,
    disabled: false,
  },
];

function App() {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { modifiedList, onInputChange } = useCheck(checkList);

  useEffect(() => {
    const enabled = modifiedList.filter((item) => !item.disabled);
    if (enabled.every((item) => item.checked)) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [modifiedList]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 400 }}>
        <table
          style={{
            border: "1px solid #dddddd",
            width: "100%",
            padding: "8px 0px",
          }}
        >
          <tr style={{ backgroundColor: "gray" }}>
            <th>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={(e) => {
                  setSelectAllChecked(e.target.checked);
                  onInputChange({ event: e, selectAll: true });
                }}
              ></input>
            </th>
            <th>Name</th>
          </tr>

          {modifiedList.map((item) => (
            <tr>
              <th>
                <input
                  id={item.id}
                  checked={item.checked}
                  type="checkbox"
                  disabled={item.disabled}
                  onChange={(e) => {
                    onInputChange({ event: e, selectAll: false });
                  }}
                ></input>
              </th>
              <th style={{ color: item.disabled ? "gray" : "black" }}>
                {item.name}
              </th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;

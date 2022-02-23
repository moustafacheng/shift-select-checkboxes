import { useState, useCallback } from "react";
type CheckList = {
  name: string;
  id: string;
  checked: boolean;
  disabled: boolean;
};

export const useCheck = (checkList: CheckList[]) => {
  const [savedId, setSavedId] = useState("");
  const [modifiedList, setModifiedList] = useState<CheckList[]>(checkList);
  const onInputChange = useCallback(
    ({
      event,
      selectAll,
    }: {
      event: React.ChangeEvent<HTMLInputElement>;
      selectAll: boolean;
    }) => {
      /* Either Check All or Uncheck All */
      if (selectAll) {
        if (event.target.checked) {
          setModifiedList((prev: CheckList[]) =>
            prev.map((item: CheckList) => {
              if (!item.disabled) {
                return { ...item, checked: true };
              } else {
                return item;
              }
            })
          );
        } else {
          setModifiedList((prev: CheckList[]) =>
            prev.map((item: CheckList) => {
              if (!item.disabled) {
                return { ...item, checked: false };
              } else {
                return item;
              }
            })
          );
        }
      } else {
        const curr = event.target.id;

        /* 
        Shift key pressed => Calculate the indexes of the current and previous checkboxes
        */
        if ((event.nativeEvent as any).shiftKey) {
          const currentIndex = modifiedList.findIndex(
            (item) => item.id === curr
          );
          const previousIndex = modifiedList.findIndex(
            (item) => item.id === savedId
          );
          const start = Math.min(currentIndex, previousIndex);
          const end = Math.max(currentIndex, previousIndex);
          if (start > -1 && end > -1) {
            /* 
            All the checked status of the checkboxes between the selected indexes (inclusive) 
            will be the same as the current one
              */
            const currentIsChecked = event.target.checked;
            setModifiedList((prev) =>
              prev.map((item, index) => {
                if (index >= start && index <= end && !item.disabled) {
                  return { ...item, checked: currentIsChecked };
                } else {
                  return item;
                }
              })
            );
          }
        } else {
          setModifiedList((prev: CheckList[]) =>
            prev.map((item: CheckList) => {
              if (item.id === event.target.id) {
                return { ...item, checked: !item.checked };
              } else {
                return item;
              }
            })
          );
        }

        setSavedId(curr);
      }
    },
    [modifiedList, savedId]
  );

  return { modifiedList, onInputChange };
};

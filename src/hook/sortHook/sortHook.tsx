import React from "react";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  setLight,
  setColor,
  setFlowers,
  setFormat,
} from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

export const SortHook = () => {
  const dispatch = useDispatch();
  const lightArray = useSelector((state: RootState) => state.sorts.light);
  const colorsArray = useSelector((state: RootState) => state.sorts.color);
  const formatArray = useSelector((state: RootState) => state.sorts.format);
  const flowersArray = useSelector((state: RootState) => state.sorts.structura);

  const light = lightArray.map((el) => el.light).flat();
  const color = colorsArray.map((el) => el.color).flat();
  const format = formatArray.map((el) => el.format).flat();
  const flowers = flowersArray.map((el) => el.structura).flat();

  const [checkedLight, setCheckedLight] = React.useState<number[]>([]);
  const [checkedColor, setCheckedColor] = React.useState<number[]>([]);
  const [checkedFormat, setCheckedFormat] = React.useState<number[]>([]);
  const [checkedFlowers, setCheckedFlowers] = React.useState<number[]>([]);

  const onClickReset = () => {
    setCheckedLight([]);
    setCheckedColor([]);
    setCheckedFormat([]);
    setCheckedFlowers([]);
  };

  const onClickCheckedLight = (index: number) => {
    setCheckedLight((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const onClickCheckedColor = (index: number) => {
    setCheckedColor((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const onClickCheckedFormat = (index: number) => {
    setCheckedFormat((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const onClickCheckedFlowers = (index: number) => {
    setCheckedFlowers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  React.useEffect(() => {
    dispatch(setLight(checkedLight.map((el) => light[el])));
    dispatch(setColor(checkedColor.map((el) => color[el])));
    dispatch(setFormat(checkedFormat.map((el) => format[el])));
    dispatch(setFlowers(checkedFlowers.map((el) => flowers[el])));
  }, [checkedLight, checkedColor, checkedFormat, checkedFlowers]);

  return {
    onClickCheckedFlowers,
    onClickCheckedFormat,
    onClickCheckedColor,
    onClickCheckedLight,
    onClickReset,
    light,
    color,
    format,
    flowers,
    checkedLight,
    checkedColor,
    checkedFormat,
    checkedFlowers,
  };
};

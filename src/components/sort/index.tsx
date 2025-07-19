import { SortHook } from "../../hook/sortHook/sortHook";
import "./sort.scss";

export const Sort = () => {
  const {
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
  } = SortHook();

  return (
    <>
      <div className="catalog-sort">
        <div className="catalog_common-block">
          <p className="catalog_sort-title">По свету</p>
          <div className="c_common_list c_light-list">
            {light.map((light, index) => (
              <label
                key={index}
                htmlFor={`light-${index}`}
                className="c_common-item c_light-item"
              >
                <input
                  id={`light-${index}`}
                  type="checkbox"
                  className="c-checbox"
                  checked={checkedLight.includes(index)}
                  onChange={() => onClickCheckedLight(index)}
                />
                {light}
              </label>
            ))}
          </div>
        </div>
        <div className="catalog_common-block">
          <p className="catalog_sort-title">По цвету</p>
          <div className="c_common_list c_color-list">
            {color.map((color, index) => (
              <label
                key={index}
                htmlFor={`color-${index}`}
                className="c_common-item c_color-item"
              >
                <input
                  id={`color-${index}`}
                  type="checkbox"
                  className="c-checbox"
                  checked={checkedColor.includes(index)}
                  onChange={() => onClickCheckedColor(index)}
                />
                {color}
              </label>
            ))}
          </div>
        </div>
        <div className="catalog_common-block">
          <p className="catalog_sort-title">по формату</p>
          <div className="c_common_list c_format-list">
            {format.map((format, index) => (
              <label
                key={index}
                htmlFor={`format-${index}`}
                className="c_common-item c_format-item"
              >
                <input
                  id={`format-${index}`}
                  type="checkbox"
                  className="c-checbox"
                  checked={checkedFormat.includes(index)}
                  onChange={() => onClickCheckedFormat(index)}
                />
                {format}
              </label>
            ))}
          </div>
        </div>
        <div className="catalog_common-block">
          <p className="catalog_sort-title">по цветку</p>
          <div className="c_common_list c_flower-list">
            {flowers.map((flower, index) => (
              <label
                key={index}
                htmlFor={`flower-${index}`}
                className="c_common-item c_flower-item"
              >
                <input
                  id={`flower-${index}`}
                  type="checkbox"
                  className="c-checbox"
                  checked={checkedFlowers.includes(index)}
                  onChange={() => onClickCheckedFlowers(index)}
                />
                {flower}
              </label>
            ))}
          </div>
        </div>
        <button onClick={() => onClickReset()} className="c_reset-filter">
          Сбросить фильтр
        </button>
      </div>
    </>
  );
};

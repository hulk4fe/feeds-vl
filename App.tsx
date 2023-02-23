import React, { useMemo, useRef } from "react";
import { useVirtualList } from "ahooks";

export default () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const wrapperRef1 = useRef(null);

  const originalList = useMemo(() => Array.from(Array(99999).keys()), []);

  const [value, onChange] = React.useState<number>(0);

  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
    overscan: 10
  });

  const [list1] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef1,
    itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
    overscan: 10
  });

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <input
          style={{ width: 120 }}
          placeholder="line number"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          style={{ marginLeft: 8 }}
          type="button"
          onClick={() => {
            scrollTo(Number(value));
          }}
        >
          scroll to
        </button>
      </div>
      <div
        ref={containerRef}
        style={{ height: "300px", overflow: "auto", display: "flex" }}
      >
        <div ref={wrapperRef} style={{ width: "50vw" }}>
          {list.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 42 : 84,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #e8e8e8",
                marginBottom: 8
              }}
              key={ele.index}
            >
              Row: {ele.data} size: {ele.index % 2 === 0 ? "small" : "large"}
            </div>
          ))}
        </div>

        <div ref={wrapperRef1} style={{ width: "50vw" }}>
          {list1.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 100 : 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #e8e8e8",
                marginBottom: 8
              }}
              key={ele.index}
            >
              Row: {ele.data} size: {ele.index % 2 === 0 ? "small" : "large"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

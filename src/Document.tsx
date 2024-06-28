const Viewer = ({ pdf }: { pdf: string }) => {
  return (
    <svg
      x="100"
      y="100"
      width="1240"
      height="1605"
      viewBox="0 0 1240 1605"
      preserveAspectRatio="meet"
      scale={0.1}
      cursor={"crosshair"}
    >
      <image href={pdf} width="1240" height="1605" />
      <rect
        x="200"
        y="166"
        width="256"
        height="41"
        vector-effect="non-scaling-stroke"
        pointer-events="all"
        stroke-width="2"
        rx="6.381093057607091"
        ry="6.381093057607091"
        className="css-ef7n63"
      ></rect>
    </svg>
  );
};

export default Viewer;

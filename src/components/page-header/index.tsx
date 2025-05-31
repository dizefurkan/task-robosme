import React from "react";

type Props = {
  className?: string;
  title: React.ReactNode;
  rightContent?: React.ReactNode;
};

function PageHeader(props: Props) {
  return (
    <header
      className={`flex items-center justify-between my-4 ${props.className || ""}`}
    >
      {typeof props.title === "string" ? (
        <h1 className="text-2xl sm:text-3xl">{props.title}</h1>
      ) : (
        props.title
      )}
      {!!props.rightContent && <div>{props.rightContent}</div>}
    </header>
  );
}

export default PageHeader;

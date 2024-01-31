import React, {
  ComponentProps,
  ComponentPropsWithRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { number } from "prop-types";

type InputHandle = {
  focus: () => void;
};
// React.InputHTMLAttributes<HTMLInputElement>

const MyInput = forwardRef<InputHandle, React.ComponentProps<"input">>(
  (props, ref) => {
    const realInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      focus() {
        realInputRef.current?.focus();
      },
    }));

    return <input {...props} ref={realInputRef} />;
  },
);

MyInput.displayName = "MyInput";

const MyForm = () => {
  const inputRef = useRef<InputHandle>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <MyInput ref={inputRef} className={"decoration-0"} type={"text"} />
      <button onClick={handleClick}>Click</button>
    </>
  );
};

const CatFriends = () => {
  const firstCatRef = useRef<HTMLImageElement>(null);
  const secondCatRef = useRef<HTMLImageElement>(null);
  const thirdCatRef = useRef<HTMLImageElement>(null);

  function handleScrollToFirstCat() {
    firstCatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  function handleScrollToSecondCat() {
    secondCatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  function handleScrollToThirdCat() {
    thirdCatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>Tom</button>
        <button onClick={handleScrollToSecondCat}>Maru</button>
        <button onClick={handleScrollToThirdCat}>Dan</button>
      </nav>
      <div>
        <ul>
          <li>
            {/*<img alt={'tom'} ref={firstCatRef} />*/}
            {/*<img alt={'tom'} ref={secondCatRef} />*/}
            {/*<img alt={'tom'} ref={thirdCatRef} />*/}
          </li>
        </ul>
      </div>
    </>
  );
};

const CatFriendsList = () => {
  const itemsRef = useRef<Map<number, HTMLLIElement>>();

  function scrollToId(itemId: number) {
    const map = getMap();
    const node = map.get(itemId);
    node?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map<number, HTMLLIElement>();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>...</nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map?.delete(cat.id);
                }
              }}
            ></li>
          ))}
        </ul>
      </div>
    </>
  );
};

type catInfo = {
  id: number;
  imageUrl: string;
};

const catList: catInfo[] = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}

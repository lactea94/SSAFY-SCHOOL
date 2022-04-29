import { useEffect, useState } from "react";


export default function Search({ setSearchText, setSearchCategory, setPage, categories }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  
  const handleClick = () => {
    setSearchText(text);
    setSearchCategory(category);
    setText("");
    setPage(1);
  }

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      handleClick();
    }
  }

  useEffect(() => {
    setCategory(categories[0].value)
  }, [categories])

  return (
    <div>
      <select
        onChange={e => {setCategory(e.target.value)}}
      >
        {categories.map((category) => {
          return (
            <option
              key={category.value}
              value={category.value}
            >
              {category.name}
            </option>
          )
        })}
      </select>
      <input
        type="text"
        value={text}
        onChange={e => {setText(e.target.value)}}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleClick}>검색</button>
    </div>
  )
}

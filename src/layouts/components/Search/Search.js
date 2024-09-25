import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import styles from "./Search.module.scss";
import { Box, InputBase, Typography, Button } from "@mui/material";
import { searchSuggestMangas } from "../../../redux/apiRequest";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // For navigation

const cx = classNames.bind(styles);

function CustomSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);

  const inputRef = useRef();

  const handleClear = () => {
    inputRef.current.focus();
    setSearchValue("");
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue.trim()) {
        const res = await searchSuggestMangas(searchValue, dispatch);
        setSearchResult(res);
        console.log("Search suggest", res);
      } else {
        setSearchResult([]);
      }
    };
    fetchData();
  }, [searchValue, dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setSearchValue(value);
    }
  };

  const handleResultClick = (id) => {
    setShowResult(false);

    navigate(`/manga/${id}`);
  };

  const handleSeeMore = () => {
    navigate(`/search/${searchValue}`);
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex={-1} {...attrs}>
            <PopperWrapper className={cx("search-wrapper")}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: "none",
                  color: "var(--yellow)",
                  fontWeight: "bold",
                }}
                mb={1}
              >
                Manga
              </Typography>
              {/* Show either first 5 results or all results based on showAllResults */}
              {(showAllResults ? searchResult : searchResult.slice(0, 5)).map(
                (result) => (
                  <Box
                    key={result.id}
                    className={cx("search-item")}
                    display="flex"
                    alignItems="center"
                    sx={{ cursor: "pointer", mb: 1 }}
                    onClick={() => handleResultClick(result.id)}
                  >
                    {/* Thumbnail on the left */}
                    <Box
                      component="img"
                      src={result.thumbnail}
                      alt={result.title}
                      sx={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: "4px",
                        mr: 2,
                      }}
                    />

                    {/* Title and latest chapter on the right */}
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "400",
                          color: "var(--white)",
                          fontFamily: "var(--font-family)",
                        }}
                      >
                        {result.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.latest_chapter}
                      </Typography>
                    </Box>
                  </Box>
                )
              )}
              {/* Render the 'See More' button if there are more than 5 results and not showing all */}
              {!showAllResults && searchResult.length > 5 && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSeeMore}
                  sx={{
                    marginTop: 1,
                    color: "var(--black)",
                    padding: "4px 8px",
                    fontSize: "12px",
                    backgroundColor: "var(--green)",
                    fontWeight: "600",
                    fontFamily: "var(--font-family)",
                    borderColor: "1px solid var(--black)",
                    "&:hover": {
                      color: "var(--green)",
                      backgroundColor: "var(--black)",
                      border: "1px solid var(--green)",
                    },
                  }}
                >
                  See More
                </Button>
              )}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "var(--dark)",
              borderRadius: 2,
              pl: 1,
              pr: 1,
              ml: 6,
              minWidth: "300px",
            }}
          >
            <Search sx={{ color: "#fff" }} />
            <InputBase
              ref={inputRef}
              value={searchValue}
              onFocus={() => setShowResult(true)}
              onChange={handleChange}
              placeholder="Search manga"
              inputProps={{ "aria-label": "search" }}
              sx={{ ml: 1, flex: 1, color: "#fff" }}
            />
          </Box>
          {!!searchValue && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default CustomSearch;

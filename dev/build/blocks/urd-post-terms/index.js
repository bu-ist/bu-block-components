/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../components/LoadingSpinner/editor.scss":
/*!************************************************!*\
  !*** ../components/LoadingSpinner/editor.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/LoadingSpinner/index.mjs":
/*!**********************************************!*\
  !*** ../components/LoadingSpinner/index.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingSpinner: () => (/* binding */ LoadingSpinner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../node_modules/classnames/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../components/LoadingSpinner/editor.scss");

/**
 * A loading spinner to be used to indicate some activity is occuring.
 *
 * @return {Element} Element to render, in this case an DIV.
 */

// External dependencies.


// Import the WP Spinner component.


// Import CSS.


/**
 * Returns the class list for the component based on the current settings.
 *
 * @param {string} className	Additional classes assigned to the component.
 * @param {string} text			If the component has loading text set.
 * @param {string} shadow		If the component has a shadow set.
 */
const getClasses = (className, text, shadow) => classnames__WEBPACK_IMPORTED_MODULE_1__('bu-components-loading-spinner', {
  [`bu-components-loading-spinner--has-shadow`]: shadow,
  [`bu-components-loading-spinner--has-text`]: text,
  [className]: className
});
const LoadingSpinner = props => {
  const {
    text = undefined,
    shadow = true,
    className = undefined
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: getClasses(className, text, shadow)
  }, text && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "bu-components-loading-spinner--label"
  }, text), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null));
};

/***/ }),

/***/ "../components/Pagination/editor.scss":
/*!********************************************!*\
  !*** ../components/Pagination/editor.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/Pagination/icons.mjs":
/*!******************************************!*\
  !*** ../components/Pagination/icons.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaginationIcons: () => (/* binding */ PaginationIcons)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");



const PaginationIcons = {
  previous: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
      width: "1200pt",
      height: "1200pt",
      version: "1.1",
      viewBox: "0 0 1200 1200",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "m723.74 918.19 70.703-70.703-247.48-247.48 247.48-247.48-70.703-70.703-318.19 318.19z"
    })),
    label: 'Previous Page'
  },
  next: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
      width: "1200pt",
      height: "1200pt",
      version: "1.1",
      viewBox: "0 0 1200 1200",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "m476.26 918.19-70.703-70.703 247.48-247.48-247.48-247.48 70.703-70.703 318.19 318.19z"
    })),
    label: 'Next Page'
  },
  first: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
      width: "1200pt",
      height: "1200pt",
      version: "1.1",
      viewBox: "0 0 1200 1200",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "m873.74 918.19 70.703-70.703-247.48-247.48 247.48-247.48-70.703-70.703-318.19 318.19z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "m450 950h-100v-700h100z"
    })),
    label: 'First Page'
  },
  last: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
      width: "1200pt",
      height: "1200pt",
      version: "1.1",
      viewBox: "0 0 1200 1200",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "m326.26 918.19-70.703-70.703 247.48-247.48-247.48-247.48 70.703-70.703 318.19 318.19z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "m750 250h100v700h-100z"
    })),
    label: 'Last Page'
  }
};

/***/ }),

/***/ "../components/Pagination/index.mjs":
/*!******************************************!*\
  !*** ../components/Pagination/index.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pagination: () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../node_modules/classnames/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "../node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _icons_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons.mjs */ "../components/Pagination/icons.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "../components/Pagination/editor.scss");

/**
 * A custom pagination component that can be used to build pagination
 * controls for data that spans multiple pages.
 */

// External Dependencies



// WordPress dependencies





// Internal dependencies


// Import CSS.

const Pagination = props => {
  const {
    className,
    currentPage = 1,
    // Default to page 1 if not provided.
    totalPages = 1,
    // Default to 1 page if not provided.
    onChange = () => {},
    // Default to an empty function if not provided.
    showPageNumbers = false,
    showMaxPageNumbers = 5,
    showPageInfo = false,
    showFirstLastButtons = false,
    showPrevNextButtons = true,
    nextLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Next'),
    prevLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Back'),
    showJumpToPage = false,
    margin = {
      marginBlock: '1em',
      marginInline: 0
    }
  } = props;

  // Track the current page in state.
  // This allows the component to re-render when the current page changes.
  const [page, setPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(currentPage);

  // Update the current page state when the currentPage prop changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setPage(currentPage);
  }, [currentPage]);

  // Handle a change to the pagination component when user clicks on a button or changes the page number.
  // This function will update the page state and call the onChange callback with the new page number.
  // It is called when the user clicks on the "Previous", "Next", "First", "Last" buttons or changes the page number in the input field.
  const handleChange = newPage => {
    setPage(newPage);
    onChange(newPage);
  };

  // Combine class names for the pagination container with any class passed to the component.
  const classes = classnames__WEBPACK_IMPORTED_MODULE_1__('bu-components-pagination', className);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: classes
    // Use the margin prop to conditionally apply margin styles
    // marginBlock and marginInline are optional props
    // If they are not provided, they will not be applied.
    ,
    style: {
      ...(margin.marginBlock ? {
        marginBlock: margin.marginBlock
      } : {}),
      ...(margin.marginInline ? {
        marginInline: margin.marginInline
      } : {})
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-pagination-container"
  }, showFirstLastButtons && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-pagination-first"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    disabled: page <= 1,
    onClick: () => handleChange(1),
    label: "First Page"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: _icons_mjs__WEBPACK_IMPORTED_MODULE_5__.PaginationIcons.first.icon
  }))), showPrevNextButtons && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    disabled: page <= 1,
    onClick: () => handleChange(page - 1)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: _icons_mjs__WEBPACK_IMPORTED_MODULE_5__.PaginationIcons.previous.icon
  }), prevLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-pagination-button-text"
  }, prevLabel))), showPageNumbers && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-pagination-numbers"
  }, (() => {
    // Logic for displaying max `showMaxPageNumbers` page numbers with ellipses
    const pageButtons = [];
    if (totalPages <= showMaxPageNumbers) {
      // Show all page numbers if total pages are less than or equal to `showMaxPageNumbers`
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
          key: i,
          isLink: true,
          disabled: i === page,
          onClick: () => handleChange(i)
        }, i));
      }
    } else {
      // Always show first page
      pageButtons.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        key: 1,
        isLink: true,
        disabled: 1 === page,
        onClick: () => handleChange(1)
      }, 1));
      // Calculate how many pages to show before and after current page
      const pagesBeforeAndAfter = Math.floor((showMaxPageNumbers - 3) / 2); // -3 for first, last, current

      // Determine start and end of displayed numbers
      let start = Math.max(2, page - pagesBeforeAndAfter);
      let end = Math.min(start + (showMaxPageNumbers - 3), totalPages - 1);

      // Adjust start if end is maxed out
      if (end === totalPages - 1) {
        start = Math.max(2, totalPages - (showMaxPageNumbers - 2));
      } else {
        // If we still have room to show more pages before
        start = Math.max(2, page - Math.floor((showMaxPageNumbers - 3) / 2));
      }

      // Final bounds check
      start = Math.min(start, totalPages - 1);
      end = Math.max(end, Math.min(totalPages - 1, start));
      // Ensure end is not less than start
      if (end < start) {
        end = start;
      }

      // Show ellipsis if needed after first page
      if (start > 2) {
        pageButtons.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          key: "ellipsis-1",
          className: "bu-components-pagination-ellipsis"
        }, "\u2026"));
      }

      // Show the calculated range
      for (let i = start; i <= end; i++) {
        pageButtons.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
          key: i,
          isLink: true,
          disabled: i === page,
          onClick: () => handleChange(i)
        }, i));
      }

      // Show ellipsis if needed before last page
      if (end < totalPages - 1) {
        pageButtons.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          key: "ellipsis-2",
          className: "bu-components-pagination-ellipsis"
        }, "\u2026"));
      }

      // Always show last page
      pageButtons.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        key: totalPages,
        isLink: true,
        disabled: totalPages === page,
        onClick: () => handleChange(totalPages)
      }, totalPages));
    }
    return pageButtons;
  })()), (showPageInfo || showJumpToPage) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-pagination-info"
  }, showPageInfo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-pagination-of"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-pagination-page-label-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Page ')), showJumpToPage ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-pagination-jump-to"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    value: page,
    onChange: value => handleChange(value),
    type: "number",
    min: 1,
    max: totalPages,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Jump to page'),
    hideLabelFromVision: true
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, page), ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('of'), ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, totalPages)), showJumpToPage && !showPageInfo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-pagination-jump-to"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    value: page,
    onChange: value => handleChange(value),
    type: "number",
    min: 1,
    max: totalPages,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Jump to page'),
    hideLabelFromVision: true
  }))), showPrevNextButtons && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    disabled: page >= totalPages,
    onClick: () => handleChange(page + 1)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, nextLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-pagination-button-text"
  }, nextLabel), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: _icons_mjs__WEBPACK_IMPORTED_MODULE_5__.PaginationIcons.next.icon
  }))), showFirstLastButtons && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-pagination-last"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    disabled: page >= totalPages,
    onClick: () => handleChange(totalPages),
    label: "Last Page"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: _icons_mjs__WEBPACK_IMPORTED_MODULE_5__.PaginationIcons.last.icon
  })))));
};

/***/ }),

/***/ "../components/PostChooser/editor-partials/assets/icons.mjs":
/*!******************************************************************!*\
  !*** ../components/PostChooser/editor-partials/assets/icons.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconPostChooserId: () => (/* binding */ IconPostChooserId),
/* harmony export */   IconPostChooserRecentlyUpdated: () => (/* binding */ IconPostChooserRecentlyUpdated),
/* harmony export */   IconPostChooserSlugSearch: () => (/* binding */ IconPostChooserSlugSearch),
/* harmony export */   IconPostChooserTextSearch: () => (/* binding */ IconPostChooserTextSearch),
/* harmony export */   IconSortMenu: () => (/* binding */ IconSortMenu)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");





// Object to hold the sort icons and labels
// Using SVG from the WordPress icons library
const SortIcons = {
  sort_menu: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M14.34,7.8H1.24c-.61,0-1.11-.5-1.11-1.11s.5-1.11,1.11-1.11h13.1c.61,0,1.11.5,1.11,1.11s-.5,1.11-1.11,1.11Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M12.35,11.85H3.24c-.61,0-1.11-.5-1.11-1.11s.5-1.11,1.11-1.11h9.11c.61,0,1.11.5,1.11,1.11s-.5,1.11-1.11,1.11Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M9.61,15.64h-3.64c-.61,0-1.11-.5-1.11-1.11s.5-1.11,1.11-1.11h3.64c.61,0,1.11.5,1.11,1.11s-.5,1.11-1.11,1.11Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M18.98,19.1c-.61,0-1.11-.5-1.11-1.11V4.3c0-.61.5-1.11,1.11-1.11s1.11.5,1.11,1.11v13.69c0,.61-.5,1.11-1.11,1.11Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M19,21.67c-.28,0-.6-.11-.81-.3l-3.78-3.58c-.45-.42-.46-1.12-.04-1.57s1.12-.46,1.57-.04l3.04,2.88,3.04-2.88c.45-.42,1.15-.4,1.57.04.42.45.4,1.15-.04,1.57l-3.78,3.58c-.21.2-.48.3-.76.3Z"
    })),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sort By:')
  },
  post_chooser_text_search: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M12.41,19.62h-6.41V4.28h12v7.79c.64.21,1.22.55,1.71.99V4.28c0-.95-.77-1.71-1.71-1.71H6c-.95,0-1.71.77-1.71,1.71v15.35c0,.95.77,1.71,1.71,1.71h8.58c-.88-.36-1.62-.96-2.17-1.71Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M15.21,7.09h-6.88c-.39,0-.7-.31-.7-.7s.31-.7.7-.7h6.88c.39,0,.7.31.7.7s-.31.7-.7.7Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M15.21,9.45h-6.88c-.39,0-.7-.31-.7-.7s.31-.7.7-.7h6.88c.39,0,.7.31.7.7s-.31.7-.7.7Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M15.21,11.87h-6.88c-.39,0-.7-.31-.7-.7s.31-.7.7-.7h6.88c.39,0,.7.31.7.7s-.31.7-.7.7Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M10.75,14.42h-2.43c-.39,0-.7-.31-.7-.7s.31-.7.7-.7h2.43c.39,0,.7.31.7.7s-.31.7-.7.7Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M9.54,16.81h-1.22c-.39,0-.7-.31-.7-.7s.31-.7.7-.7h1.22c.39,0,.7.31.7.7s-.31.7-.7.7Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M16.36,20.81c-2.29,0-4.15-1.86-4.15-4.15s1.86-4.15,4.15-4.15,4.15,1.86,4.15,4.15-1.86,4.15-4.15,4.15ZM16.36,14.02c-1.46,0-2.65,1.19-2.65,2.65s1.19,2.65,2.65,2.65,2.65-1.19,2.65-2.65-1.19-2.65-2.65-2.65Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M18.27,17.22s0,0,0,0c-.13,0-.23-.11-.23-.24.02-.51-.16-1-.51-1.38-.35-.38-.82-.59-1.34-.61-.13,0-.23-.11-.23-.24,0-.13.1-.26.24-.23.64.02,1.23.29,1.66.76.43.47.66,1.08.64,1.71,0,.13-.11.23-.23.23Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M21.84,23.15c-.23,0-.46-.09-.64-.26l-2.86-2.86c-.35-.35-.35-.92,0-1.27.35-.35.92-.35,1.27,0l2.86,2.86c.35.35.35.92,0,1.27-.18.18-.41.26-.64.26Z"
    })),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Search')
  },
  post_chooser_recently_updated: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M15.97,21.34h.74c.09,0,.18-.01.26-.03-.18,0-.36,0-.55,0-.15,0-.3,0-.45.02ZM16.71,2.56H4.71c-.95,0-1.71.77-1.71,1.71v15.35c0,.95.77,1.71,1.71,1.71h6.28s-.02-.02-.03-.03c-.39-.51-.7-1.08-.94-1.69h-5.31V4.28h12v5.93c.65.03,1.22.15,1.71.35v-6.27c0-.95-.77-1.71-1.71-1.71Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M16.42,22.24c-2.84,0-5.15-2.31-5.15-5.15s2.31-5.15,5.15-5.15,5.15,2.31,5.15,5.15-2.31,5.15-5.15,5.15ZM16.42,13.44c-2.01,0-3.65,1.64-3.65,3.65s1.64,3.65,3.65,3.65,3.65-1.64,3.65-3.65-1.64-3.65-3.65-3.65Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M14.25,18.79c-.17,0-.32-.09-.41-.24-.13-.23-.05-.52.18-.64l1.93-1.09v-2.16c0-.26.21-.47.47-.47s.47.21.47.47v2.71l-2.41,1.36c-.07.04-.15.06-.23.06Z"
    })),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Recently Updated')
  },
  post_chooser_slug_search: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M19.98,3.79c-1.71-1.71-4.49-1.71-6.2,0l-2.71,2.71-.91.91c-.28.28-.28.74,0,1.03l.18.18c.28.28.74.28,1.03,0l.91-.91,2.71-2.71c1.04-1.04,2.75-1.04,3.84.05s1.04,2.75,0,3.79l-2.71,2.71-.91.91c-.28.28-.28.74,0,1.03l.18.18c.28.28.74.28,1.03,0l.91-.91,2.71-2.71c1.71-1.71,1.71-4.49-.05-6.25Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M3.5,20.27c-1.71-1.71-1.71-4.49,0-6.2l2.71-2.71.91-.91c.28-.28.74-.28,1.03,0l.18.18c.28.28.28.74,0,1.03l-.91.91-2.71,2.71c-1.04,1.04-1.04,2.75.05,3.84s2.75,1.04,3.79,0l2.71-2.71.91-.91c.28-.28.74-.28,1.03,0l.18.18c.28.28.28.74,0,1.03l-.91.91-2.71,2.71c-1.71,1.71-4.49,1.71-6.25-.05Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M7.45,16.37c-.4-.4-.4-1.05,0-1.45l7.48-7.48c.4-.4,1.05-.4,1.45,0s.4,1.05,0,1.45l-7.48,7.48c-.4.4-1.05.4-1.45,0Z"
    })),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post Slug')
  },
  post_chooser_id: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M18,4.33v11.98l-2.78,3.37H6V4.33h12M18,2.61H6c-.95,0-1.71.77-1.71,1.71v15.35c0,.95.77,1.71,1.71,1.71h9.22c.51,0,1-.23,1.32-.62l2.78-3.37c.25-.31.39-.69.39-1.09V4.33c0-.95-.77-1.71-1.71-1.71h0Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M18,16.31l-2.78,3.37v-3.37h2.78M18,14.83h-2.78c-.81,0-1.47.66-1.47,1.47v3.37c0,.62.39,1.18.97,1.39.16.06.33.09.5.09.43,0,.85-.19,1.14-.54l2.78-3.37c.36-.44.44-1.05.2-1.57-.24-.52-.76-.84-1.33-.84h0Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M15.5,10.52h-6.96c-.33,0-.6-.27-.6-.6s.27-.6.6-.6h6.96c.33,0,.6.27.6.6s-.27.6-.6.6Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M15.5,13.34h-6.96c-.33,0-.6-.27-.6-.6s.27-.6.6-.6h6.96c.33,0,.6.27.6.6s-.27.6-.6.6Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M10.29,15.28s-.05,0-.08,0c-.33-.04-.56-.34-.52-.67l.88-6.91c.04-.33.35-.57.67-.52.33.04.56.34.52.67l-.88,6.91c-.04.3-.3.52-.59.52Z"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
      d: "M13.08,15.28s-.05,0-.08,0c-.33-.04-.56-.34-.52-.67l.89-6.91c.04-.33.35-.57.67-.52.33.04.56.34.52.67l-.89,6.91c-.04.3-.3.52-.59.52Z"
    })),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post ID')
  }
};
const IconSortMenu = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
  size: 24,
  icon: SortIcons.sort_menu.icon
});
const IconPostChooserTextSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
  size: 24,
  icon: SortIcons.post_chooser_text_search.icon
});
const IconPostChooserRecentlyUpdated = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
  size: 24,
  icon: SortIcons.post_chooser_recently_updated.icon
});
const IconPostChooserSlugSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
  size: 24,
  icon: SortIcons.post_chooser_slug_search.icon
});
const IconPostChooserId = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
  size: 24,
  icon: SortIcons.post_chooser_id.icon
});


/***/ }),

/***/ "../components/PostChooser/editor-partials/loading-overlay/editor.scss":
/*!*****************************************************************************!*\
  !*** ../components/PostChooser/editor-partials/loading-overlay/editor.scss ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/PostChooser/editor-partials/loading-overlay/index.js":
/*!**************************************************************************!*\
  !*** ../components/PostChooser/editor-partials/loading-overlay/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingOverlay: () => (/* binding */ LoadingOverlay),
/* harmony export */   LoadingSpinner: () => (/* binding */ LoadingSpinner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LoadingSpinner_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../LoadingSpinner/index.mjs */ "../components/LoadingSpinner/index.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor-partials/loading-overlay/editor.scss");

// WordPress Dependencies


// Internal Dependencies


// Import Editor CSS.

const LoadingSpinner = props => {
  const {
    loading
  } = props;

  // Spinner visibility state for animation
  const [spinnerVisible, setSpinnerVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Effect to handle animating the spinner
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (loading) {
      setSpinnerVisible(true);
    } else {
      // Delay hiding to allow for fade-out animation
      const timer = setTimeout(() => {
        setSpinnerVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-spinner",
    "data-spinnervisible": spinnerVisible
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LoadingSpinner_index_mjs__WEBPACK_IMPORTED_MODULE_2__.LoadingSpinner, null));
};
const LoadingOverlay = props => {
  const {
    loading
  } = props;

  // Overlay visibility state for animation
  const [overlayVisible, setOverlayVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Effect to handle animating the overlay
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (loading) {
      setOverlayVisible(true);
    } else {
      // Delay hiding to allow for fade-out animation
      const timer = setTimeout(() => {
        setOverlayVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-overlay",
    "data-overlayvisible": overlayVisible
  });
};

/***/ }),

/***/ "../components/PostChooser/editor-partials/modal/editor.scss":
/*!*******************************************************************!*\
  !*** ../components/PostChooser/editor-partials/modal/editor.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/PostChooser/editor-partials/modal/index.js":
/*!****************************************************************!*\
  !*** ../components/PostChooser/editor-partials/modal/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostChooserModal: () => (/* binding */ PostChooserModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _results_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../results/index.js */ "../components/PostChooser/editor-partials/results/index.js");
/* harmony import */ var _search_ui_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../search-ui/index.js */ "../components/PostChooser/editor-partials/search-ui/index.js");
/* harmony import */ var _results_controls_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../results-controls/index.mjs */ "../components/PostChooser/editor-partials/results-controls/index.mjs");
/* harmony import */ var _loading_overlay_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loading-overlay/index.js */ "../components/PostChooser/editor-partials/loading-overlay/index.js");
/* harmony import */ var _components_Pagination_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/Pagination/index.mjs */ "../components/Pagination/index.mjs");
/* harmony import */ var _hooks_useGetPagination_index_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../hooks/useGetPagination/index.mjs */ "../hooks/useGetPagination/index.mjs");
/* harmony import */ var _hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../hooks/useRequestData/index.mjs */ "../hooks/useRequestData/index.mjs");
/* harmony import */ var _hooks_useDebouncedInput_index_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../hooks/useDebouncedInput/index.mjs */ "../hooks/useDebouncedInput/index.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor-partials/modal/editor.scss");





// Internal dependencies





// Import from Block Imports Package.





// Import CSS

const PostChooserModal = props => {
  const {
    onClose = () => {},
    // Function to call when the modal is closed.
    label,
    onSelectPost = () => {},
    // Function to call when a post is selected.
    postTypes = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Posts'),
      value: 'post'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pages'),
      value: 'page'
    }],
    // Default post types to search.
    primaryPostType,
    // Optional: only needed to override the first postType in the array
    placeholder = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter a search term…'),
    title = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose a Post'),
    minCharacters = 3,
    metaFilters = {},
    // Meta query filters (like meta_query in WP_Query)
    taxonomyFilters = {} // Taxonomy filters (like tax_query in WP_Query)
  } = props;

  // Use the new useDebouncedInput hook to handle both immediate and debounced search terms
  // searchTerm - updates immediately with each keystroke for responsive UI
  // debouncedSearchTerm - only updates after delay (used for API calls to reduce requests)
  const [searchTerm, setSearchTerm, searchTermThrottled] = (0,_hooks_useDebouncedInput_index_mjs__WEBPACK_IMPORTED_MODULE_11__.useDebouncedInput)('', 300);
  const [sortOrder, setSortOrder] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    orderby: 'date',
    order: 'desc'
  });
  const [searchType, setSearchType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('recent');
  const [selectedPostType, setSelectedPostType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(primaryPostType || (postTypes && postTypes.length > 0 ? postTypes[0].value : 'post'));

  // Handle search Pagination for each search type separately
  const [searchCurrentPage, setSearchCurrentPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    recent: 1,
    default: 1,
    slug: 1,
    id: 1
  });

  // Store search results separately for each search type
  const [searchResults, setSearchResults] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    recent: {
      posts: null,
      totalItems: 0,
      totalPages: 0
    },
    default: {
      posts: null,
      totalItems: 0,
      totalPages: 0
    },
    slug: {
      posts: null,
      totalItems: 0,
      totalPages: 0
    },
    id: {
      posts: null,
      totalItems: 0,
      totalPages: 0
    }
  });

  // State to hold converted taxonomy filters (slug-to-ID conversion)
  const [convertedTaxonomyFilters, setConvertedTaxonomyFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [isConvertingFilters, setIsConvertingFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Helper function to detect if a value is likely a slug (contains hyphens, no numbers)
  const isLikelySlug = value => {
    if (typeof value !== 'string') return false;
    // Check if it contains hyphens and doesn't look like a numeric ID
    return value.includes('-') && isNaN(parseInt(value));
  };

  // Helper function to check if taxonomyFilters need conversion
  const needsConversion = filters => {
    if (!filters || Object.keys(filters).length === 0) return false;
    for (const [taxonomy, terms] of Object.entries(filters)) {
      const termList = typeof terms === 'string' ? terms.split(',').map(t => t.trim()) : terms;
      if (Array.isArray(termList) && termList.some(term => isLikelySlug(term))) {
        return true;
      }
    }
    return false;
  };

  // Fetch term data for slug-to-ID conversion
  // Only fetch if we detect slugs in the taxonomyFilters
  const shouldFetchTerms = needsConversion(taxonomyFilters);
  const termQueries = shouldFetchTerms ? Object.entries(taxonomyFilters).map(([taxonomy, terms]) => {
    const termList = typeof terms === 'string' ? terms.split(',').map(t => t.trim()) : terms;
    return {
      taxonomy,
      terms: termList,
      query: {
        slug: termList.join(','),
        per_page: 100
      } // Fetch terms by slug
    };
  }) : [];

  // Use useRequestData to fetch term data for each taxonomy that needs conversion
  const termResults = termQueries.map(({
    taxonomy,
    query
  }) => {
    // Only use the hook if we actually need to fetch terms
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [terms, loading] = shouldFetchTerms ? (0,_hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_10__.useRequestData)('taxonomy', taxonomy, query) : [null, false];
    return {
      taxonomy,
      terms,
      loading
    };
  });

  // Convert slugs to IDs when term data is available
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!shouldFetchTerms) {
      setConvertedTaxonomyFilters(taxonomyFilters);
      setIsConvertingFilters(false);
      return;
    }
    setIsConvertingFilters(true);

    // Check if all term queries have finished loading
    const allLoaded = termResults.every(result => !result.loading);
    if (allLoaded) {
      const converted = {
        ...taxonomyFilters
      };
      termResults.forEach(({
        taxonomy,
        terms
      }) => {
        if (terms && Array.isArray(terms)) {
          // Convert slug list to ID list
          const originalTerms = taxonomyFilters[taxonomy];
          const originalSlugList = typeof originalTerms === 'string' ? originalTerms.split(',').map(t => t.trim()) : originalTerms;
          const termIds = terms.filter(term => originalSlugList.includes(term.slug)).map(term => term.id);
          if (termIds.length > 0) {
            converted[taxonomy] = termIds.join(',');
          }
        }
      });
      setConvertedTaxonomyFilters(converted);
      setIsConvertingFilters(false);
    }
  }, [termResults.map(r => r.loading).join(','), shouldFetchTerms]);

  // Determine if search term is numeric for ID search
  const isSearchTermNumeric = searchTermThrottled && !isNaN(searchTermThrottled) && !isNaN(parseFloat(searchTermThrottled));

  // Base query parameters
  const baseQuery = {
    per_page: 10,
    orderby: sortOrder.orderby,
    order: sortOrder.order,
    status: 'publish',
    // Apply meta filters (like adding meta_query to WP_Query)
    ...metaFilters,
    // Apply taxonomy filters (like adding tax_query to WP_Query) - use converted filters with IDs
    ...convertedTaxonomyFilters
  };

  // Recent posts query (always active)
  const recentQuery = {
    ...baseQuery,
    page: searchCurrentPage.recent,
    orderby: sortOrder.orderby,
    order: sortOrder.order
  };
  console.log('PostChooserModal recentQuery', recentQuery);

  // Content search query (only when there's a search term)
  const contentQuery = searchTermThrottled ? {
    ...baseQuery,
    search: searchTermThrottled,
    page: searchCurrentPage.default
  } : null;

  // Slug search query (only when there's a search term) - exact slug match only
  const slugQuery = searchTermThrottled ? {
    ...baseQuery,
    slug: searchTermThrottled,
    page: searchCurrentPage.slug
  } : null;

  // ID search query (only when search term is numeric)
  const idQuery = isSearchTermNumeric ? {
    ...baseQuery,
    include: [parseInt(searchTermThrottled)],
    page: searchCurrentPage.id
  } : null;

  // Use separate useRequestData hooks for each search type
  const [recentPosts, recentLoading, recentInvalidateResolver] = (0,_hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_10__.useRequestData)('postType', selectedPostType, recentQuery);
  console.log('PostChooserModal recentPosts', recentPosts);
  const [contentPosts, contentLoading, contentInvalidateResolver] = (0,_hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_10__.useRequestData)('postType', selectedPostType, contentQuery);
  const [slugPosts, slugLoading, slugInvalidateResolver] = (0,_hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_10__.useRequestData)('postType', selectedPostType, slugQuery);
  const [idPosts, idLoading, idInvalidateResolver] = (0,_hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_10__.useRequestData)('postType', selectedPostType, idQuery);
  console.log('PostChooserModal idPosts', idPosts);

  // Get pagination for each search type
  const {
    pagination: recentPagination
  } = (0,_hooks_useGetPagination_index_mjs__WEBPACK_IMPORTED_MODULE_9__.useGetPagination)('postType', selectedPostType, recentQuery);
  const {
    pagination: contentPagination
  } = (0,_hooks_useGetPagination_index_mjs__WEBPACK_IMPORTED_MODULE_9__.useGetPagination)('postType', selectedPostType, contentQuery || {});
  const {
    pagination: slugPagination
  } = (0,_hooks_useGetPagination_index_mjs__WEBPACK_IMPORTED_MODULE_9__.useGetPagination)('postType', selectedPostType, slugQuery || {});
  const {
    pagination: idPagination
  } = (0,_hooks_useGetPagination_index_mjs__WEBPACK_IMPORTED_MODULE_9__.useGetPagination)('postType', selectedPostType, idQuery || {});

  // Update search results state when individual search results change
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setSearchResults(prevResults => ({
      ...prevResults,
      recent: {
        posts: recentPosts,
        totalItems: recentPagination.totalItems || 0,
        totalPages: recentPagination.totalPages || 0
      }
    }));
  }, [recentPosts, recentPagination]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (searchTermThrottled) {
      setSearchResults(prevResults => ({
        ...prevResults,
        default: {
          posts: contentPosts,
          totalItems: contentPagination.totalItems || 0,
          totalPages: contentPagination.totalPages || 0
        }
      }));
    } else {
      setSearchResults(prevResults => ({
        ...prevResults,
        default: {
          posts: null,
          totalItems: 0,
          totalPages: 0
        }
      }));
    }
  }, [contentPosts, contentPagination, searchTermThrottled]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (searchTermThrottled) {
      setSearchResults(prevResults => ({
        ...prevResults,
        slug: {
          posts: slugPosts,
          totalItems: slugPagination.totalItems || 0,
          totalPages: slugPagination.totalPages || 0
        }
      }));
    } else {
      setSearchResults(prevResults => ({
        ...prevResults,
        slug: {
          posts: null,
          totalItems: 0,
          totalPages: 0
        }
      }));
    }
  }, [slugPosts, slugPagination, searchTermThrottled]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isSearchTermNumeric) {
      setSearchResults(prevResults => ({
        ...prevResults,
        id: {
          posts: idPosts,
          totalItems: idPagination.totalItems || 0,
          totalPages: idPagination.totalPages || 0
        }
      }));
    } else {
      setSearchResults(prevResults => ({
        ...prevResults,
        id: {
          posts: null,
          totalItems: 0,
          totalPages: 0
        }
      }));
    }
  }, [idPosts, idPagination, isSearchTermNumeric]);

  // Get current results based on selected search type
  const getCurrentResults = () => {
    return searchResults[searchType] || {
      posts: null,
      totalItems: 0,
      totalPages: 0
    };
  };

  // Get current loading state based on selected search type
  const getCurrentLoadingState = () => {
    let searchLoading = false;
    switch (searchType) {
      case 'recent':
        searchLoading = recentLoading;
        break;
      case 'default':
        searchLoading = contentLoading;
        break;
      case 'slug':
        searchLoading = slugLoading;
        break;
      case 'id':
        searchLoading = idLoading;
        break;
      default:
        searchLoading = false;
    }
    // Include filter conversion loading state
    return searchLoading || isConvertingFilters;
  };

  // Get current page for selected search type
  const getCurrentPage = () => {
    return searchCurrentPage[searchType] || 1;
  };

  // Get current invalidate function based on selected search type
  const getCurrentInvalidateFunction = () => {
    switch (searchType) {
      case 'recent':
        return recentInvalidateResolver;
      case 'default':
        return contentInvalidateResolver;
      case 'slug':
        return slugInvalidateResolver;
      case 'id':
        return idInvalidateResolver;
      default:
        return () => {};
    }
  };
  const handleSearch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    // Trigger search by invalidating all search results
    recentInvalidateResolver();
    if (searchTermThrottled) {
      contentInvalidateResolver();
      slugInvalidateResolver();
    }
    if (isSearchTermNumeric) {
      idInvalidateResolver();
    }
  }, [recentInvalidateResolver, contentInvalidateResolver, slugInvalidateResolver, idInvalidateResolver, searchTermThrottled, isSearchTermNumeric]);

  // Handle page change for current search type
  const handlePageChange = newPage => {
    setSearchCurrentPage(prev => ({
      ...prev,
      [searchType]: newPage
    }));
    getCurrentInvalidateFunction()();
  };

  /**
  * When the search term changes or when we have search results,
  * automatically switch to the appropriate search type.
  *
  * Note: Don't enter `searchType` as a dependency in this effect.
  * Doing so will cause a rerender and the setting will be undone.
  */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (searchTermThrottled && searchType === 'recent') {
      // Auto-switch to content search when user starts typing
      setSearchType('default');
    } else if (!searchTermThrottled && searchType !== 'recent') {
      // Auto-switch back to recent when search term is cleared
      setSearchType('recent');
    }
  }, [searchTermThrottled]);

  // Get current results and metadata
  const currentResults = getCurrentResults();
  const currentLoading = getCurrentLoadingState();
  const currentPage = getCurrentPage();
  const currentTotalPages = currentResults.totalPages || 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: title,
    onRequestClose: onClose,
    isOpen: false,
    className: "bu-components-post-chooser-modal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-modal-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_search_ui_index_js__WEBPACK_IMPORTED_MODULE_5__.SearchUI, {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    isLoading: currentLoading || false,
    label: label,
    placeholder: placeholder,
    setSearchType: setSearchType,
    postTypes: postTypes,
    primaryPostType: primaryPostType,
    selectedPostType: selectedPostType,
    setSelectedPostType: setSelectedPostType
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_results_controls_index_mjs__WEBPACK_IMPORTED_MODULE_6__.ResultsControls, {
    searchTerm: searchTermThrottled,
    searchType: searchType,
    sortOrder: sortOrder,
    setSortOrder: setSortOrder,
    contentResultsCount: searchResults.default.totalItems || 0,
    slugResultsCount: searchResults.slug.totalItems || 0,
    idResultsCount: searchResults.id.totalItems || 0,
    onChange: newType => {
      setSearchType(newType);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-scrollable"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_overlay_index_js__WEBPACK_IMPORTED_MODULE_7__.LoadingSpinner, {
    loading: currentLoading
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_overlay_index_js__WEBPACK_IMPORTED_MODULE_7__.LoadingOverlay, {
    loading: currentLoading
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_results_index_js__WEBPACK_IMPORTED_MODULE_4__.Results, {
    posts: currentResults.posts,
    onSelectPost: onSelectPost,
    totalItems: currentResults.totalItems,
    loading: currentLoading,
    searchTerm: searchTermThrottled,
    searchType: searchType
  }), currentTotalPages > 1 && currentResults.posts && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Pagination_index_mjs__WEBPACK_IMPORTED_MODULE_8__.Pagination, {
    className: "bu-components-post-chooser-pagination",
    currentPage: currentPage,
    totalPages: currentTotalPages,
    onChange: handlePageChange,
    showPageInfo: false,
    showPageNumbers: true,
    showFirstLastButtons: false,
    prevLabel: false,
    nextLabel: false,
    showMaxPageNumbers: 6
  })))));
};

/***/ }),

/***/ "../components/PostChooser/editor-partials/results-controls/editor.scss":
/*!******************************************************************************!*\
  !*** ../components/PostChooser/editor-partials/results-controls/editor.scss ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/PostChooser/editor-partials/results-controls/index.mjs":
/*!****************************************************************************!*\
  !*** ../components/PostChooser/editor-partials/results-controls/index.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResultsControls: () => (/* binding */ ResultsControls)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _assets_icons_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons.mjs */ "../components/PostChooser/editor-partials/assets/icons.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor-partials/results-controls/editor.scss");





// Internal dependencies


const ResultsControls = props => {
  const {
    searchTerm,
    searchType,
    sortOrder,
    setSortOrder,
    contentResultsCount = 0,
    // Todo: Add support for content results count
    slugResultsCount = 0,
    // Todo: Add support for slug results count
    idResultsCount = 0,
    // Todo: Add support for ID results count
    onChange = () => {} // Function to call when the search type or sort order changes.
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-controls"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    justify: "space-between",
    align: "center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, {
    className: "bu-components-post-chooser-results-controls-type"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadioGroup, {
    className: "bu-components-post-chooser-search-type",
    label: "Search Type",
    onChange: onChange,
    checked: searchType
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadio, {
    value: "recent",
    icon: _assets_icons_mjs__WEBPACK_IMPORTED_MODULE_4__.IconPostChooserRecentlyUpdated,
    iconPosition: "right",
    className: searchType === 'recent' ? 'is-active' : ''
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-label-short"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Recent')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-label-long"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ly Updated')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadio, {
    value: "default",
    icon: _assets_icons_mjs__WEBPACK_IMPORTED_MODULE_4__.IconPostChooserTextSearch,
    iconPosition: "right",
    className: searchType === 'default' ? 'is-active' : ''
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content'), searchTerm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-count"
  }, contentResultsCount)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadio, {
    value: "slug",
    icon: _assets_icons_mjs__WEBPACK_IMPORTED_MODULE_4__.IconPostChooserSlugSearch,
    iconPosition: "right",
    className: searchType === 'slug' ? 'is-active' : ''
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-label-long"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post ')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-label-short"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slug')), searchTerm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-count"
  }, slugResultsCount)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadio, {
    value: "id",
    icon: _assets_icons_mjs__WEBPACK_IMPORTED_MODULE_4__.IconPostChooserId,
    iconPosition: "right",
    className: searchType === 'id' ? 'is-active' : ''
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-label-long"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post ')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-label-short"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ID')), searchTerm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-controls-type-count"
  }, idResultsCount)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, {
    className: "bu-components-post-chooser-results-controls-sort"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
    className: "bu-components-post-chooser-results-controls-sort-dropdown",
    contentClassName: "bu-components-post-chooser-results-controls-sort-dropdown-content",
    position: "bottom right",
    popoverProps: {
      className: 'bu-components-post-chooser-results-controls-sort-dropdown-popover',
      noArrow: false
    },
    renderToggle: ({
      isOpen,
      onToggle,
      onClose
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: () => {
        onToggle();
      },
      "aria-expanded": isOpen,
      icon: _assets_icons_mjs__WEBPACK_IMPORTED_MODULE_4__.IconSortMenu,
      label: "Sort By:",
      disabled: searchTerm || searchType === 'recent' ? false : true
    }),
    renderContent: ({
      isOpen,
      onToggle,
      onClose
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bu-components-post-chooser-results-controls-sort-dropdown-content-inner"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
      className: "bu-components-post-chooser-results-controls-sort-dropdown-close-icon",
      icon: "dismiss",
      onClick: onToggle
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      className: "bu-components-post-chooser-results-controls-sort-by",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sort By'),
      value: sortOrder.orderby,
      onChange: value => setSortOrder({
        orderby: value,
        order: sortOrder.order
      }),
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Publish Date'),
        value: 'date'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title'),
        value: 'title'
      }]
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadioGroup, {
      className: "bu-components-post-chooser-results-controls-sort-direction",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sort By'),
      onChange: value => {
        if (value === 'asc') {
          setSortOrder({
            order: 'asc',
            orderby: sortOrder.orderby
          });
        } else if (value === 'desc') {
          setSortOrder({
            order: 'desc',
            orderby: sortOrder.orderby
          });
        }
      },
      checked: sortOrder.order
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadio, {
      value: "asc"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
      icon: "arrow-up-alt",
      size: 24
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalRadio, {
      value: "desc"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
      icon: "arrow-down-alt",
      size: 24
    }))))
  }))));
};

/***/ }),

/***/ "../components/PostChooser/editor-partials/results-item/editor.scss":
/*!**************************************************************************!*\
  !*** ../components/PostChooser/editor-partials/results-item/editor.scss ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/PostChooser/editor-partials/results-item/index.mjs":
/*!************************************************************************!*\
  !*** ../components/PostChooser/editor-partials/results-item/index.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResultsItem: () => (/* binding */ ResultsItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor-partials/results-item/editor.scss");






// Import CSS.

const ResultsItem = props => {
  const {
    post,
    onSelectPost,
    placeholder
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "bu-components-post-chooser-results-item",
    "data-placeholder": placeholder,
    key: post?.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-item-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "bu-components-post-chooser-results-item-title"
  }, post?.title && (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_3__.decodeEntities)(post.title?.rendered), post?.link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-item-link"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ExternalLink, {
    href: post.link
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-item-link-text"
  }, "View Post")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-item-metadata"
  }, post?.modified && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-item-modified"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Modified: ')), (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_4__.dateI18n)('F j, Y, g:i a', post.modified))), post?.status && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-results-item-status"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Status: ')), post.status)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "bu-components-post-chooser-item-select-button",
    onClick: () => onSelectPost(post),
    disabled: placeholder
  }, "Select"))));
};

/***/ }),

/***/ "../components/PostChooser/editor-partials/results/editor.scss":
/*!*********************************************************************!*\
  !*** ../components/PostChooser/editor-partials/results/editor.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/PostChooser/editor-partials/results/help-post-id.png":
/*!**************************************************************************!*\
  !*** ../components/PostChooser/editor-partials/results/help-post-id.png ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/help-post-id.3a3dd04e.png";

/***/ }),

/***/ "../components/PostChooser/editor-partials/results/index.js":
/*!******************************************************************!*\
  !*** ../components/PostChooser/editor-partials/results/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Results: () => (/* binding */ Results)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _results_item_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../results-item/index.mjs */ "../components/PostChooser/editor-partials/results-item/index.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor-partials/results/editor.scss");
/* harmony import */ var _help_post_id_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./help-post-id.png */ "../components/PostChooser/editor-partials/results/help-post-id.png");

// WordPress dependencies


// Internal dependencies


// Import CSS.


// Import Assets.

const Results = props => {
  const {
    posts,
    onSelectPost,
    loading,
    totalItems,
    searchTerm,
    searchType
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results"
  }, !posts && !searchTerm && searchType !== 'recent' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-message bu-components-post-chooser-before-search-message"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-message-box"
  }, searchType === 'slug' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search by Slug')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter the post slug to find it quickly.'))), searchType === 'default' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search Post Content')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter a search term to search the Title & Post Content. Note, post meta, taxonomies, and other metadata will not be searched.'))), searchType === 'id' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Find post by its ID')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('If looking for a specific post, enter the'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post ID')), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('in the search field.')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "bu-components-post-chooser-help-image",
    src: _help_post_id_png__WEBPACK_IMPORTED_MODULE_4__
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The post ID can be found in the URL of the post edit screen.'))))), searchTerm && !loading && totalItems === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-message bu-components-post-chooser-no-results-message"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-results-message-box"
  }, searchType === 'default' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Posts Found')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The search term:'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, searchTerm), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('did not match any posts.')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your search term might be too specific. Try broadening your search.')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('If you have a specific post in mind, try searching for its title. Alternatively, you can try entering the post ID or slug.'))), searchType === 'slug' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post Slug Not Found')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Check that the slug is exactly the same as the slug of the post. A partial match will not work.'))), searchType === 'id' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post ID Not Found')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Check that a numerical post ID has been entered and that the post type is correct.'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "bu-components-post-chooser-results-list",
    "data-loading": loading
  }, loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.from({
    length: 20
  }).map((_, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_results_item_index_mjs__WEBPACK_IMPORTED_MODULE_2__.ResultsItem, {
    key: index,
    placeholder: true
  }))), posts && Array.isArray(posts) && posts.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, posts.map(post => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_results_item_index_mjs__WEBPACK_IMPORTED_MODULE_2__.ResultsItem, {
    key: post.id,
    post: post,
    onSelectPost: onSelectPost
  })))));
};

/***/ }),

/***/ "../components/PostChooser/editor-partials/search-ui/editor.scss":
/*!***********************************************************************!*\
  !*** ../components/PostChooser/editor-partials/search-ui/editor.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/PostChooser/editor-partials/search-ui/index.js":
/*!********************************************************************!*\
  !*** ../components/PostChooser/editor-partials/search-ui/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchUI: () => (/* binding */ SearchUI)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_LoadingSpinner_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/LoadingSpinner/index.mjs */ "../components/LoadingSpinner/index.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor-partials/search-ui/editor.scss");





const SearchUI = props => {
  const {
    searchTerm,
    setSearchTerm,
    setSearchType,
    isLoading,
    label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter a search query'),
    hideLabelFromVision = true,
    placeholder,
    postTypes,
    primaryPostType,
    selectedPostType = primaryPostType || 'post',
    setSelectedPostType = () => {}
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-search-ui"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-search-controls"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    justify: "space-between",
    align: "start",
    className: "bu-components-post-chooser-search-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexBlock, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-search-bar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    className: "bu-components-post-chooser-search-field-base-control",
    label: label,
    hideLabelFromVision: hideLabelFromVision
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-search-field-container-inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-search-field-icon-container"
  }, isLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LoadingSpinner_index_mjs__WEBPACK_IMPORTED_MODULE_3__.LoadingSpinner, {
    shadow: false,
    className: "bu-components-post-chooser-search-field-spinner"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "search",
    size: 26,
    className: "bu-components-post-chooser-search-icon"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: searchTerm,
    onChange: event => setSearchTerm(event.target.value),
    placeholder: placeholder,
    className: "bu-components-post-chooser-search-field",
    tabIndex: "0" // Todo: this is not working to set the focus on the search field when the modal opens.
  }), searchTerm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bu-components-post-chooser-search-field-icon-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clear search'),
    onClick: () => {
      setSearchTerm('');
      setSearchType('recent');
    },
    icon: "dismiss",
    size: 26,
    className: "bu-components-post-chooser-search-clear-button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bu-components-post-chooser-search-clear-button-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clear'))))))))), postTypes.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    className: "bu-components-post-chooser-posttype-select",
    justify: "space-between",
    align: "center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexBlock, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter by Post Type'),
    value: selectedPostType,
    onChange: value => setSelectedPostType(value),
    options: postTypes
  })))));
};

/***/ }),

/***/ "../components/PostChooser/editor.scss":
/*!*********************************************!*\
  !*** ../components/PostChooser/editor.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../components/PostChooser/index.mjs":
/*!*******************************************!*\
  !*** ../components/PostChooser/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostChooser: () => (/* reexport safe */ _postchooser_js__WEBPACK_IMPORTED_MODULE_0__.PostChooser),
/* harmony export */   PostChooserSidebar: () => (/* reexport safe */ _postchoosersidebar_js__WEBPACK_IMPORTED_MODULE_1__.PostChooserSidebar)
/* harmony export */ });
/* harmony import */ var _postchooser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./postchooser.js */ "../components/PostChooser/postchooser.js");
/* harmony import */ var _postchoosersidebar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./postchoosersidebar.js */ "../components/PostChooser/postchoosersidebar.js");



/***/ }),

/***/ "../components/PostChooser/postchooser.js":
/*!************************************************!*\
  !*** ../components/PostChooser/postchooser.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostChooser: () => (/* binding */ PostChooser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_partials_modal_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor-partials/modal/index.js */ "../components/PostChooser/editor-partials/modal/index.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor.scss");

/**
 * Component: Post Chooser
 *
 * Displays the ten most recently published posts,
 * and an option to search.
 */

// WordPress dependencies


// Internal dependencies


// Import Editor Styles for this Component.

const PostChooser = props => {
  const {
    onSelectPost,
    modalLabel,
    modalTitle,
    postTypes = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Posts'),
      value: 'post'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pages'),
      value: 'page'
    }],
    // Default post types when none provided
    primaryPostType,
    // Only needed when you want to override the first postType in the array
    searchPlaceholder,
    minCharacters = 3,
    onClose,
    metaFilters = {},
    taxonomyFilters = {}
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_partials_modal_index_js__WEBPACK_IMPORTED_MODULE_2__.PostChooserModal, {
    onSelectPost: onSelectPost,
    label: modalLabel,
    title: modalTitle,
    postTypes: postTypes,
    primaryPostType: primaryPostType,
    placeholder: searchPlaceholder,
    minCharacters: minCharacters,
    onClose: onClose,
    metaFilters: metaFilters,
    taxonomyFilters: taxonomyFilters
  });
};

/***/ }),

/***/ "../components/PostChooser/postchoosersidebar.js":
/*!*******************************************************!*\
  !*** ../components/PostChooser/postchoosersidebar.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostChooserSidebar: () => (/* binding */ PostChooserSidebar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "../components/PostChooser/editor.scss");

/**
 * Component: Post Chooser Sidebar
 *
 * Sidebar component for edits to selected post.
 */

// WordPress dependencies.





// Import Editor Styles for this Component.

const PostChooserSidebar = function (props) {
  const {
    children,
    // Optional. Allows child elements to be passed into the component.
    postID,
    // The ID of the selected post.
    postTitle,
    // The title of the selected post.
    postURL,
    // The URL of the selected post.
    onRemovePost = () => {},
    // Function to call when the post is removed.
    removePostButtonLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove'),
    // Label for the remove post button.
    openButtonLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Post'),
    // Label for the open post chooser button.
    changeButtonLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change'),
    // Label for the change post button.
    panelTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Selected Post'),
    // Title for the sidebar panel.
    showPostLink = true,
    // Whether to show a link to the post.
    onOpenPostChooserModal = () => {} // Function to call when the open modal button is pressed.
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: panelTitle,
    className: "bu-components-post-chooser-sidebar-options"
  }, postTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-post-chooser-sidebar-posttitle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "components-post-chooser-sidebar-posttitle-label"
  }, "Title:"), postURL && showPostLink && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
    href: postURL,
    className: "components-post-chooser-sidebar-posttitle-link"
  }, "View Post"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "components-post-chooser-sidebar-posttitle-heading"
  }, (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__.decodeEntities)(postTitle)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    wrap: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isPrimary: true,
    onClick: () => onOpenPostChooserModal()
  }, postID ? changeButtonLabel : openButtonLabel)), postID && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isLink: true,
    onClick: onRemovePost
  }, removePostButtonLabel)))), children && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-post-chooser-sidebar-children"
  }, children))));
};

/***/ }),

/***/ "../hooks/useDebouncedInput/index.mjs":
/*!********************************************!*\
  !*** ../hooks/useDebouncedInput/index.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDebouncedInput: () => (/* binding */ useDebouncedInput)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/**
 * WordPress dependencies
 */



/**
 * Hook for debouncing input field values.
 *
 * Returns an array with:
 * - The current input value (updates immediately)
 * - Function to update the input value
 * - The debounced input value (updates after delay)
 *
 * @param {string} defaultValue - The default value for the input.
 * @param {number} delay - The debounce delay in milliseconds.
 * @return {[string, (value: string) => void, string]} Input values and setter.
 */
function useDebouncedInput(defaultValue = '', delay = 500) {
  const [input, setInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue);
  const [debouncedInput, setDebouncedInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue);

  // Create a debounced version of setDebouncedInput
  const setDebouncedInputWithDelay = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useDebounce)(setDebouncedInput, delay);

  // Effect to update the debounced value when input changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setDebouncedInputWithDelay(input);
  }, [input, setDebouncedInputWithDelay]);
  return [input, setInput, debouncedInput];
}

/***/ }),

/***/ "../hooks/useGetPagination/index.mjs":
/*!*******************************************!*\
  !*** ../hooks/useGetPagination/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGetPagination: () => (/* binding */ useGetPagination)
/* harmony export */ });
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/**
 * WordPress dependencies
 */






// Add a check for the existence of getEntityRecordsTotalItems and getEntityRecordsTotalPages
// These are only available in WordPress 6.5 and later.
// If they are not available, we will use apiFetch to get the pagination information.
const hasNewSelectors = typeof (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.store).getEntityRecordsTotalItems === 'function' && typeof (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.store).getEntityRecordsTotalPages === 'function';
if (!hasNewSelectors) {
  console.warn('getEntityRecordsTotalItems and getEntityRecordsTotalPages are not available in @wordpress/core-data for this Version of WordPress. Using apiFetch instead.');
}

/**
 * Hook for retrieving data from the WordPress REST API.
 *
 * @param {string} entity           The entity to retrieve. Defaults to postType.
 * @param {string} kind             The entity kind to retrieve. Defaults to post.
 * @param {object | number} [query] Optional. Query to pass to the getEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.
 * @return {Object}            	    Object with records and pagination info
 */
const useGetPagination = (entity = 'postType', kind = 'post', query = {}) => {
  // State to hold pagination information
  // This will hold total items and total pages.
  const [pagination, setPagination] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({
    totalItems: 0,
    totalPages: 0,
    perPage: query.per_page || 10 // Default to 10 items per page if not specified
  });

  /**
   * Only runs in WordPress 6.5 and later.
   * Uses the new getEntityRecordsTotalItems and getEntityRecordsTotalPages selectors
   * to get the total items and total pages for the specified entity and kind.
   *
   * Returns an object with totalItems, totalPages, and isLoading.
   *
   * If the new selectors are not available, this effect will return an object with
   * totalItems and totalPages set to 0, and isLoading set to false.
   */
  const {
    totalItems,
    totalPages,
    isLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const coreSelect = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.store);
    return {
      totalItems: hasNewSelectors ? coreSelect.getEntityRecordsTotalItems(entity, kind, query) : 0,
      totalPages: hasNewSelectors ? coreSelect.getEntityRecordsTotalPages(entity, kind, query) : 0,
      isLoading: hasNewSelectors ? select('core/data').isResolving(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.store, 'getEntityRecords', [entity, kind, query]) : false // Return false if the new selectors are not available.
    };
  }, [entity, kind, query, hasNewSelectors]);

  /**
   * Updates the pagination state with the total items and total pages
   * if the new selectors are available and the data is loaded.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!hasNewSelectors) return; // If the new selectors are not available, skip this effect.

    if (!isLoading && totalItems && totalPages) {
      // Update the pagination state with total items and pages.
      setPagination(prev => ({
        ...prev,
        totalItems: totalItems,
        totalPages: totalPages
      }));
    }
  }, [totalItems, totalPages, hasNewSelectors, isLoading]);

  /**
   * Fetches the entity configuration for the specified entity and kind.
   * This allows us to construct the API endpoint for fetching pagination information via apiFetch.
   *
   * @effect
   * @dependency {string} entity
   * @dependency {string} kind
   * @returns {Object} The entity configuration object, or undefined if not found.
   */
  const entityConfig = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    // Use getEntitiesByKind to get the entity config.
    const entities = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.store).getEntitiesByKind(entity);
    return entities?.find(e => e.name === kind);
  }, [entity, kind]);

  /**
   * Fetches pagination information from the WordPress REST API.
   *
   * This effect runs whenever records, entity, kind, query, or entityConfig changes. It returns
   * the total items and total pages for the specified entity and kind in the same format as
   * the newer getEntityRecordsTotalItems and getEntityRecordsTotalPages selectors that we don't
   * have access to yet in this version of WordPress.
   *
   * It will not run if the new getEntityRecordsTotalItems and getEntityRecordsTotalPages
   * selectors are available (WordPress 6.5+).
   *
   * After we upgrade to WordPress 6.5 or later, this effect should be able to be removed.
   *
   * It makes a direct API request to the same endpoint that getEntityRecords uses,
   * but with a minimal per_page setting to reduce data transfer.
   *
   * The effect extracts total items and total pages from the response headers
   * (X-WP-Total and X-WP-TotalPages) and updates the pagination state.
   *
   * ToDo: In future WordPress versions (6.4+), this might be replaceable with
   * the getEntityRecordsTotalItems and getEntityRecordsTotalPages selectors.
   *
   * @effect
   * @dependency {Array} [records, entity, kind, JSON.stringify(query), entityConfig, pagination]
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    // Only run this effect if the new selectors are not available, such as before WordPress 6.5.
    if (hasNewSelectors) return;
    const loadPaginationData = async () => {
      // If  entityConfig is available, skip fetching pagination data.
      if (!entityConfig) return;

      // Set default values for total items and pages.
      let totalItems = 0;
      let totalPages = 0;

      // Construct the same API path that getEntityRecords uses.
      const path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(entityConfig.baseURL, {
        ...entityConfig.baseURLParams,
        ...query,
        // Request the same number of records per page as specified in the query,
        // or default to 10 if not specified.
        per_page: pagination.perPage,
        page: 1 // Only request the first page to get total items and pages.
      });
      try {
        // Make a direct fetch to the REST API.
        const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__({
          path,
          parse: false
        });

        // Extract pagination info from the response headers.
        const totalItemsHeader = response.headers.get('X-WP-Total');
        const totalPagesHeader = response.headers.get('X-WP-TotalPages');
        totalItems = totalItemsHeader !== null ? parseInt(totalItemsHeader, 10) : 0;
        totalPages = totalPagesHeader !== null ? parseInt(totalPagesHeader, 10) : 0;
      } catch (error) {
        console.error('Error fetching pagination data:', error);
        totalItems = 0;
        totalPages = 0;
      } finally {
        // Update the pagination state.
        setPagination(prev => ({
          ...prev,
          totalItems: totalItems,
          totalPages: totalPages
        }));
      }
    };
    // Call the function to load pagination data.
    // This will run whenever records, entity, kind, query, or entityConfig changes
    loadPaginationData();
  }, [JSON.stringify(query), entityConfig]);

  // Return the pagination information
  return {
    pagination
  };
};

/***/ }),

/***/ "../hooks/useMedia/index.mjs":
/*!***********************************!*\
  !*** ../hooks/useMedia/index.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMedia: () => (/* binding */ useMedia)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");


function useMedia(id) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const {
      getMedia,
      isResolving,
      hasFinishedResolution
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store);
    const mediaParameters = [id, {
      context: "view"
    }];
    return {
      media: getMedia(...mediaParameters),
      isResolvingMedia: isResolving("getMedia", mediaParameters),
      hasResolvedMedia: hasFinishedResolution("getMedia", mediaParameters)
    };
  }, [id]);
}

/***/ }),

/***/ "../hooks/useRequestData/index.mjs":
/*!*****************************************!*\
  !*** ../hooks/useRequestData/index.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRequestData: () => (/* binding */ useRequestData)
/* harmony export */ });
/* harmony import */ var lodash_isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject.js */ "../node_modules/lodash/isObject.js");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/**
 * External dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies


/**
 * WordPress dependencies
 */



/**
 * Hook for retrieving data from the WordPress REST API.
 *
 * @param {string} entity           The entity to retrieve. Defaults to postType.
 * @param {string} kind             The entity kind to retrieve. Defaults to posts.
 * @param {object | number} [query] Optional. Query to pass to the geEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.
 * @returns {Array} The data returned from the request.
 */
const useRequestData = (entity = 'postType', kind = 'post', query = {}) => {
  console.log('useRequestData', {
    entity,
    kind,
    query
  });
  const whichGER = lodash_isObject_js__WEBPACK_IMPORTED_MODULE_0__(query) ? 'getEntityRecords' : 'getEntityRecord';
  const {
    invalidateResolution
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/data');
  const {
    data,
    isLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      data: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store)[whichGER](entity, kind, query),
      isLoading: select('core/data').isResolving(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store, whichGER, [entity, kind, query])
    };
  }, [entity, kind, query]);
  const invalidateResolver = () => {
    invalidateResolution(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store, whichGER, [entity, kind, query]);
  };
  return [data, isLoading, invalidateResolver];
};

/***/ }),

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingSpinner: () => (/* reexport safe */ _components_LoadingSpinner_index_mjs__WEBPACK_IMPORTED_MODULE_0__.LoadingSpinner),
/* harmony export */   Pagination: () => (/* reexport safe */ _components_Pagination_index_mjs__WEBPACK_IMPORTED_MODULE_2__.Pagination),
/* harmony export */   PostChooser: () => (/* reexport safe */ _components_PostChooser_index_mjs__WEBPACK_IMPORTED_MODULE_1__.PostChooser),
/* harmony export */   PostChooserSidebar: () => (/* reexport safe */ _components_PostChooser_index_mjs__WEBPACK_IMPORTED_MODULE_1__.PostChooserSidebar),
/* harmony export */   useDebouncedInput: () => (/* reexport safe */ _hooks_useDebouncedInput_index_mjs__WEBPACK_IMPORTED_MODULE_6__.useDebouncedInput),
/* harmony export */   useGetPagination: () => (/* reexport safe */ _hooks_useGetPagination_index_mjs__WEBPACK_IMPORTED_MODULE_5__.useGetPagination),
/* harmony export */   useMedia: () => (/* reexport safe */ _hooks_useMedia_index_mjs__WEBPACK_IMPORTED_MODULE_3__.useMedia),
/* harmony export */   useRequestData: () => (/* reexport safe */ _hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_4__.useRequestData)
/* harmony export */ });
/* harmony import */ var _components_LoadingSpinner_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/LoadingSpinner/index.mjs */ "../components/LoadingSpinner/index.mjs");
/* harmony import */ var _components_PostChooser_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/PostChooser/index.mjs */ "../components/PostChooser/index.mjs");
/* harmony import */ var _components_Pagination_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Pagination/index.mjs */ "../components/Pagination/index.mjs");
/* harmony import */ var _hooks_useMedia_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/useMedia/index.mjs */ "../hooks/useMedia/index.mjs");
/* harmony import */ var _hooks_useRequestData_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks/useRequestData/index.mjs */ "../hooks/useRequestData/index.mjs");
/* harmony import */ var _hooks_useGetPagination_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks/useGetPagination/index.mjs */ "../hooks/useGetPagination/index.mjs");
/* harmony import */ var _hooks_useDebouncedInput_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hooks/useDebouncedInput/index.mjs */ "../hooks/useDebouncedInput/index.mjs");
// Components
// export { AllowedBlocks } from './components/AllowedBlocks';
// export { Background } from './components/Background';
// export { BlockIcons } from './components/BlockIcons';
// export { ColorSettings } from './components/ColorSettings';
// export { ContentSearch } from './components/content-search';
// export { ContentPicker } from './components/ContentPicker';
// export { CustomBlockAppender } from './components/CustomBlockAppender';
// export { DragHandle } from './components/drag-handle';
// export { FetchAllTermSelectControl } from './components/FetchAllTermSelectControl';
// export { HelpWrapper } from './components/HelpWrapper';
// export { IconPicker } from './components/IconPicker';
// export { Image } from './components/Image/index.mjs';
// export { LinkToolbar } from './components/LinkToolbar';

// export { MediaCredit } from './components/MediaCredit/media-credit.js';
// export { Optional } from './components/Optional';
// export { ParagraphCaptionStyle } from './components/ParagraphCaptionStyle/paragraph-caption-style.js';
// export { ParagraphEndOfArticleStyle } from './components/ParagraphEndOfArticleStyle/paragraph-end-of-article-style.js';
// export { PlainTextWithLimit } from './components/PlainTextWithLimit';


// export { PostPicker } from './components/PostPicker';
// export { Repeater } from './components/Repeater';
// export { RichTextWithLimit } from './components/RichTextWithLimit';
// export { ShareTools } from './components/ShareTools';
// export { StyledComponentContext } from './components/styled-components-context';
// export { TermSelector } from './components/TermSelector';


// Hooks
// A React Hook is a special function that lets you "hook into" React state and lifecycle features from within functional components. Hooks enable stateful logic and side effects within functional components, offering a way to reuse logic across components. Crucially, hooks can only be called inside React functional components or custom hooks, and they must follow the "rules of hooks," such as being called at the top level of a component and not within loops or conditional statements.
// export { useFilteredList } from './hooks/use-filtered-list';
// export { useIcons } from './hooks/use-icons';
// export { useAllTerms } from './hooks/useAllTerms';

// export { useRenderAppenderWithBlockLimit } from './hooks/useRenderAppenderWithBlockLimit';




// Utils
// A utility function is a standard JavaScript function that performs a specific task and is not tied to any particular framework or library. Utility functions are often used for tasks like data formatting, calculations, or other operations that don't require access to React's state or lifecycle. They can be called from anywhere in your code, including within React components or hooks.
// export { parseMedia } from './utils/parseMedia/index.mjs';

/***/ }),

/***/ "../node_modules/@wordpress/icons/build-module/icon/index.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/classnames/index.js":
/*!*******************************************!*\
  !*** ../node_modules/classnames/index.js ***!
  \*******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "../node_modules/lodash/isObject.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isObject.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./src/blocks/urd-post-terms/block.json":
/*!**********************************************!*\
  !*** ./src/blocks/urd-post-terms/block.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/wp/5.8/block.json","apiVersion":2,"name":"imports-dev/urd-post-term","version":"0.1.0","title":"Using useRequestData to get post terms","category":"widgets","icon":"database-view","description":"Get Dem Terms","example":{},"attributes":{"postID":{"type":"string","default":""}},"supports":{"html":false},"textdomain":"imports-dev-urd-post-term","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ }),

/***/ "./src/blocks/urd-post-terms/edit.js":
/*!*******************************************!*\
  !*** ./src/blocks/urd-post-terms/edit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bostonuniversity_block_imports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bostonuniversity/block-imports */ "../index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/urd-post-terms/editor.scss");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */




/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  props
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    postID
  } = attributes;

  // Query for post data
  const [postData, postIsLoading] = (0,_bostonuniversity_block_imports__WEBPACK_IMPORTED_MODULE_3__.useRequestData)('postType', 'import-bob', postID);

  // Query for fish terms if we have post data
  const [fishTerms, termsIsLoading] = (0,_bostonuniversity_block_imports__WEBPACK_IMPORTED_MODULE_3__.useRequestData)(postData ? 'taxonomy' : undefined, 'fish', postData ? {
    post: postID
  } : undefined);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: "Post Settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Post ID",
    value: postID,
    onChange: value => setAttributes({
      postID: value
    })
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (postIsLoading || termsIsLoading) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bostonuniversity_block_imports__WEBPACK_IMPORTED_MODULE_3__.LoadingSpinner, {
    text: "Loading",
    shadow: false,
    className: "terms-loading-spinner"
  }), fishTerms && fishTerms.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fish-terms"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Fish Terms:"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, fishTerms.map(term => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: term.id
  }, term.name)))), !postID && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Enter a post ID in the inspector controls"), postID && fishTerms && fishTerms.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "No fish terms found for this post.")));
}

/***/ }),

/***/ "./src/blocks/urd-post-terms/editor.scss":
/*!***********************************************!*\
  !*** ./src/blocks/urd-post-terms/editor.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/urd-post-terms/index.js":
/*!********************************************!*\
  !*** ./src/blocks/urd-post-terms/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/urd-post-terms/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/urd-post-terms/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/urd-post-terms/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/urd-post-terms/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/urd-post-terms/save.js":
/*!*******************************************!*\
  !*** ./src/blocks/urd-post-terms/save.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

//import { useRequestData } from '@bostonuniversity/block-imports';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
function save() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save()
  });
}

/***/ }),

/***/ "./src/blocks/urd-post-terms/style.scss":
/*!**********************************************!*\
  !*** ./src/blocks/urd-post-terms/style.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["date"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/html-entities":
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["htmlEntities"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/urd-post-terms/index": 0,
/******/ 			"blocks/urd-post-terms/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkdev"] = globalThis["webpackChunkdev"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/urd-post-terms/style-index"], () => (__webpack_require__("./src/blocks/urd-post-terms/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
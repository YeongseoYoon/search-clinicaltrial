# Search-Clinicaltrial

## 프로젝트 소개

- 질환명 검색 시 입력한 단어를 기반으로 검색어를 추천해주는 프로젝트입니다.

## 데모 영상

<img src="https://github.com/wanted-internship-12-9/pre-onboarding-12th-3-9/assets/86523545/e426d34c-c2c6-4f84-a4d0-e51a541ca0c1">

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

### Convention

<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/lint staged-white?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

## 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜api.ts
 ┃ ┣ 📜axios.ts
 ┃ ┗ 📜index.ts
 ┣ 📂constants
 ┃ ┗ 📜index.ts
 ┣ 📂hooks
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜useDebounce.ts
 ┣ 📂pages
 ┃ ┗ 📂home
 ┃ ┃ ┣ 📜Home.style.ts
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyles.style.ts
 ┣ 📂types
 ┃ ┗ 📜index.ts
 ┣ 📂utils
 ┃ ┣ 📜getCachedData.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜isCachedDataExpired.ts
 ┃ ┗ 📜setCacheData.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```

## Assignment별 구현 방식

### Assignment 1. API호출을 통해 검색어 추천 기능 구현

- axios api요청 재사용성을 고려하여 axios instance를 사용하였습니다.
- useCallback 이용해 데이터페칭 커스텀 훅을 메모이제이션했습니다.
- 입력값이 없을 경우에는 api 호출을 하지 않도록 했습니다.

### Assignment 2. API 호출별로 로컬 캐싱 구현 (+expire time)

- **CacheStorage**는 localStorage 및 sessionStorage 에 비해 **용량이 크고 비동기**로 처리됩니다.(블로킹이 없음)
  DB 단의 데이터가 자주 변경 되는 경우에 브라우저의 storage를 사용하는 경우 stale한 데이터를 보여줄 수도 있는 위험이 있지만, 데이터의 특성을 고려했을 때 자주 변하지 않는 데이터라고 판단해서 브라우저의 storage를 사용하기로 결정했습니다.

- cache api 및 cacheStorage를 사용하여 util함수로 getCachedData, setCacheData를 구현하였습니다.

- api 최초 호출 시에는 캐시 스토리지에 저장. 저장시 fetch date도 함께 저장하고, 이후의 api 요청시 캐시 스토리지에 값이 있다면 저장된 fetch date와 현재 시각을 비교한뒤 expire date보다 크다면(만료) 새로 api를 호출해 캐시 스토리지에 저장합니다. 그렇지 않다면 캐시 스토리지의 데이터를 그대로 사용토록 했습니다.

### Assignment 3. 입력 시 API 호출 횟수 최소화 전략

> ### 🚀 debounce 패턴을 적용한 커스텀 훅이 어디까지 처리해줘야 하는가?<br>
>
> 커스텀 훅이 **사용자의 검색 키워드**에 대한 처리만 해줘야 할지, 검색 키워드에 대한 **api 요청과 결과를 함께 처리**해줘야 할지에 대한 고민이 있었습니다.

- debounce 훅의 역할과 책임이 어느정도까지인가에 대한 고민이 있었습니다. debounce 훅 외부에서 api 호출 로직을 주입해 콜백할지, 아니면 입력되는 키워드에 대해서만 debounce를 적용시킬지에 대해 고민했습니다.

- `useDebounce훅의 관심사는 디바운싱이다!` 라는 결론을 내리고, 입력된 키워드에 debounce 처리를 한 후, debounce 된 키워드가 변할때마다 useEffect 훅을 사용해 api를 호출하도록 했습니다.

- debouncedKeyword를 통해 debouncedKeyword를 trim()해 공백 제거 후 api 요청

```js
const getRecommendList = useCallback(async () => {
  try {
    const data = await getDataList(debouncedKeyword);
    setRecommendList(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data.message);
    }
  }
}, [debouncedKeyword]);

useEffect(() => {
  if (debouncedKeyword.length > 0) {
    getRecommendList();
  }
}, [debouncedKeyword]);
```

### Assignment 4. 키보드만으로 추천 검색어 이동 기능 구현

- div element로 각 추천 검색어들을 불러온 뒤, 각각을 useRef()로 배열에 저장하고, 키보드 상하키와 탭키를 눌렀을경우에 배열의 index를 증가 혹은 감소 시켜 focus() 되도록했습니다.
- event.preventDefault()로, 이벤트가 두 번 발생해 이동되는 것을 막았습니다.
- input에서 바라탄언어(한국어 포함)의 입력인지 아닌지를 구별 위해 event.nativeEvent.isComposing === false 처리했습니다.

```JS
  const handleRecommendedListKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.code === TAB_CODE || event.code === ARROW_DOWN_CODE) {
      event.preventDefault();
      recommendedRef.current[index + 1]?.focus();
    }
    if (event.code === ARROW_UP_CODE) {
      if (index === 0) {
        inputRef.current?.focus();
      }
      recommendedRef.current[index - 1]?.focus();
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.code === TAB_CODE && event.nativeEvent.isComposing === false) ||
      (event.code === ARROW_DOWN_CODE && event.nativeEvent.isComposing === false)
    ) {
      event.preventDefault();
      recommendedRef.current[0]?.focus();
    }
  };

  const setRecommendListRef = (element: HTMLDivElement | null, index: number) => {
    if (!element) {
      return;
    }
    recommendedRef.current[index] = element;
  };
```

### Assignment 5. 기타 사항

- 추천 검색어 리스트에 스크롤바(수직 스크롤)가 생성되도록 했습니다.
- X 버튼을 누를시에는 Input창이 비워지도록 했습니다.
- 검색어에 포커스 되었을 시에 색상이 변경됩니다.

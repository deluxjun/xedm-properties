import { observer, inject } from "mobx-react";
import ReactDOM from "react-dom";
import React, { FC, ChangeEvent, useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { useStore } from "@/stores";

// @inject((stores) => ({
//   elementId: stores.docInfo.elementId,
//   data: [],
//   total: 0,
//   skip: 0,
//   pageSize: 10,
//   getHistory: (page, pageSize) => {
//     stores.docInfo.getHistory(page, pageSize).then((res) => {
//       this.props.data = res.list;
//       this.props.total = res.totalCount;
//     });
//   },
// }))
// @observer
const History = observer(() => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { docInfo } = useStore();

  useEffect(() => {
    getHistory(skip, pageSize);
  }, []);

  const getHistory = (skip, pageSize) => {
    let page = 1 + Math.floor(skip / pageSize);
    docInfo.getHistory(page, pageSize).then((res) => {
      setData(res.list);
      setTotal(res.totalCount);
    });
  };

  const pageChange = (event) => {
    setSkip(event.page.skip);
    getHistory(skip, pageSize);
  };

  //   render() {
  return (
    <Grid
      style={{ height: "440px" }}
      rowHeight={40}
      data={data.slice(skip, skip + 20)}
      pageSize={pageSize}
      total={data.length}
      skip={skip}
      scrollable={"virtual"}
      onPageChange={pageChange}
    >
      <Column field="event" title="Event" width="70px" />
      <Column field="userId" title="User Id" />
      <Column field="userName" title="User Name" />
      <Column field="date" title="Date" width="120px" />
      <Column field="title" title="Title" width="200px" />
    </Grid>
  );
  //   }
});
export default History;

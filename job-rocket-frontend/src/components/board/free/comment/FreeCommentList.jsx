import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getFreeCommentList } from "../../../../api/board/free-board";
import { useQuery } from "@tanstack/react-query";
import FreeComment from "./FreeComment";

const FreeCommentList = ({ boardId }) => {
	const { data, isPending } = useQuery({
		queryKey: ["freeCommentList"],
		queryFn: () => getFreeCommentList({ boardId }),
	});

	if (isPending) return <div>Loading...</div>;

	return (
		<div>
			{data.map((item) => (
				<FreeComment item={item} key={item.id} />
			))}
		</div>
	);
};

export default FreeCommentList;

import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkelLoader = () => {
  return (
    <>
      <SkeletonTheme baseColor="#404040" highlightColor="#777" >
      <p>
        <Skeleton height={20} />
      </p>
    </SkeletonTheme>
    </>
  )
}

export default SkelLoader

import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";

export const VisuallyHiddenInput=styled("input")({
    border:0,
    clip:"rect(0 0 0 0)",
    height:"1px",
    margin:-1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    whiteSpace:"nowrap",
    width:"1",
})


export const Link=styled(LinkComponent)`
    color:black;
    text-decoration:none;
    padding:1rem;
    &:hover{
        background-color:rgba(0,0,0,0.1)
    }`

export const InputBox=styled("input")`
    width:100%;
    height:100%;
    border:none;
    outline:none;
    padding:0 3rem;
    border-radius:1.5rem;
    background-color:${grayColor};
    `

export const SearchField=styled("input")`
    padding:1rem 2rem;
    border-radius:1.5rem;
    background-color:${grayColor};
    border:none;
    outline:none;
    width:20vmax;
    font-size:1.1rem;
`

export const CurveButton=styled("button")`
    padding:1rem 2rem;
    border-radius:1.5rem;
    background-color:${matBlack};
    border:none;
    outline:none;
    font-size:1.1rem;
    color:white;
    cursor:pointer;
    &:hover{
        background-color:rgba(0,0,0,0.8);
    }
`

const bounceAnimation=keyframes`
    0%{transform:scale(1);}
    50%{transform:scale(1.5);}
    100%{transform:scale(1);}
`

export const BouncingSkeleton=styled(Skeleton)(()=>({
    animation:`${bounceAnimation} 1s infinite`
}))
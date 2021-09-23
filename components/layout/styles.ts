import styled from "styled-components";

interface StyledButtonInterface {
    marginAuto?: "toRight" | "toLeft" | "none";
    whenVisible?: "always" | "never" | "> 600px" | "< 600px";
    isHalfTransparent?: boolean;
}
export const StyledButton = styled.div<StyledButtonInterface>`
    margin: 0 1rem;
    ${(p) => p.marginAuto == "toLeft" && "margin-left: auto;"}
    ${(p) => p.marginAuto == "toRight" && "margin-right: auto;"}

    font-weight: 400;
    color: #fff;
    box-shadow: 0px 0px 0px rgba(var(--accent-col), 0.5);
    border-radius: 0.5rem;
    transition: 0.3s ease;
    transform: translateY(0rem) scale(1);
    ${(p) => p.isHalfTransparent && "opacity: 0.5;"}

    > a {
        padding: 0.5rem;
        display: block;
    }
    > div {
        padding: 0.5rem;
        > svg {
            margin-right: 0.3rem;
        }
    }

    &:hover,
    &.active {
        cursor: pointer;
        transform: translateY(-0.5rem) scale(1.05);
        opacity: 1;
        box-shadow: 0px 10px 30px rgba(var(--accent-col), 0.5),
            0px 10px 30px rgba(var(--accent-col), 0.5) inset;
    }
    &:active {
        transform: translateY(-0.5rem) scale(0.95);
    }

    @media screen and (min-width: 600px) {
        ${(p) => p.whenVisible == "< 600px" && "display: none;"}
    }
    @media screen and (max-width: 600px) {
        ${(p) => p.whenVisible == "> 600px" && "display: none;"}
    }
`;

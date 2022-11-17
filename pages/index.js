import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/Index";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estiloDaHomePage = { backgroundColor: "pink" };

    const [valorDoFiltro, setValorDoFiltro] = React.useState("Angular");

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                {/*Prop Drilling*/}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </TimeLine>
            </div>
        </>

    );
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1}; 
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%
    }
    .user-info{
        display: flex;
        aling-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
  `;
  const StyledBanner = styled.div`
    background-color: pink;
    background-image: url("https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80");
    height: 230px;
  `;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}

                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine({searchValue, ...props}) {
    const playlistsNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistsNames) => {
                const videos = props.playlists[playlistsNames];
                return (
                    <section>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            })
                            .map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

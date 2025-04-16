import './App.css';
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { octokit } from "./Octokit.js";


function App() {
  var information = {
      id: [],
      r: [],
      lr: [],
      c: [],
      pr: [],
      oi: []
  };
  const [ids, setIds] = useState([]);
  const [repos, setRepos] = useState([]);
  const [releases, setReleases] = useState([]);
  const [pulls, setPulls] = useState([]);
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);


  const searchRepos = async () => {
    await octokit.request('GET /users/{owner}/repos', {
      owner: 'duosecurity',
      per_page: 100,
      type: "public",
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    .then((d) => {
      console.log("getting repos")
      var names = d.data.map((object) => object.name)
      names.splice(0, 2)
      setRepos(names)
      information.r = names;
      let ids = Array.from({length: names.length}, (_, i) => i + 1)
      information.id = ids

    })
  }

  const getReleases = async () => {
    await searchRepos()
    var repos = information.r
    var latest_releases = []
    for(let i = 0; i < (repos.length)-1; i++){
      await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner: 'duosecurity',
        repo: repos[i],
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then((d) => {
        if (d.data.length == 0)
          latest_releases.push("-")
        else
          latest_releases.push(d.data.map((object) => object.tag_name)[0])
      }) 
    }
    information.lr = latest_releases
  }

  const getCommitsSinceLR = async () => {
    await getReleases()
    var repos = information.r
    var latest_releases = information.lr
    var commits_since = []
    for(let i = 0; i < (repos.length)-1; i++){
      if(latest_releases[i] !== '-'){
        await octokit.request('GET /repos/{owner}/{repo}/compare/{base}...{head}', {
          owner: 'duosecurity',
          repo: repos[i],
          base: latest_releases[i],
          head: "HEAD",
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .then((d) => {
          commits_since.push(d.data.ahead_by)
        }) 
      } else {
        commits_since.push('-')
      }
    }
    information.c = commits_since
  }

  const getPullRequests = async () => {
    await searchRepos()
    var repos = information.r
    var pull_requests = []
    for(let i = 0; i < (repos.length)-1; i++){
      await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'duosecurity',
        repo: repos[i],
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then((d) => {
        pull_requests.push(d.data.length)
      }) 
    }
    information.pr = pull_requests
  }

  const getIssues = async () => {
    await getPullRequests()
    var repos = information.r
    var pullr = information.pr
    var issues = []
    for(let i = 0; i < (repos.length)-1; i++){
      await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'duosecurity',
        repo: repos[i],
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then((d) => {
        issues.push((d.data.length) - pullr[i])
      }) 
    }
    information.oi = issues
    console.log(information)
  }

  useEffect( () => {
    async function createData() {
      await getCommitsSinceLR()
      await getIssues()

      var rows = []
      var r = information.r
      for(let i = 0; i <(r.length)-1; i++){
        var dict = { 
          id: information.id[i], 
          r: information.r[i], 
          lr: information.lr[i], 
          c: information.c[i],
          pr: information.pr[i],
          oi: information.oi[i], 
        }; 
        rows.push(dict)
      }
      console.log(rows)
      setRows(rows)
      return;
    }

    // setCount((count) => count + 1);
    createData();
},[]);
  
  const columns = [
    { field: 'r', headerName: 'Repository', width: 400 },
    { field: 'lr', headerName: 'Latest Release', width: 250 },
    { field: 'c', 
      headerName: 'Commits Since Latest Release',
      width: 250 },
    {
      field: 'pr',
      headerName: 'Open Pull Requests',
      width: 250,
    },
    {
      field: 'oi',
      headerName: 'Open Issues',
      width: 250,
    },
  ];


  return (
    <div className="mainpage">
      {/* <p>{count}</p> */}
      <DataGrid
        rows={rows}
        columns={columns}
      ></DataGrid>
    </div>
  );
};

export default App;

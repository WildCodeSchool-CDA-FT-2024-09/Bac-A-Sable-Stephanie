import * as fs from 'fs';

// Define types for Repos, Lang, and LangByRepo
type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
};

type Lang = {
  id: number;
  label: string;
};

type LangByRepo = { repo_id: string; lang_id: number };

type LangRaw = { node: { name: string } };

// Function to fetch the raw data and process it into tables
async function getRepos() {
  // Read the raw data from the JSON file
  const raw = await JSON.parse(fs.readFileSync('./data/raw.json', { encoding: 'utf-8' }));

  // Arrays to hold the processed data
  const repos: Repo[] = [];
  const languages: Lang[] = [];
  const langByRepo: LangByRepo[] = [];

  // Variable to track unique language IDs
  let langId = 1;

  // Iterate over each repo in the raw data
  raw.forEach((repo: any) => {
    // Push the repo data into repos array
    repos.push({
      id: repo.id,
      name: repo.name,
      url: repo.url,
      isPrivate: repo.isPrivate ? 0 : 1 // 0 for private, 1 for public
    });

    // Process languages for each repo
    repo.languages.forEach((lang: LangRaw) => {
      // Check if the language is already added to the languages array
      if (!languages.some((lg: Lang) => lg.label === lang.node.name)) {
        // If not, add the language with a new ID
        languages.push({ id: langId, label: lang.node.name });
        langId++;
      }

      // Find the language ID of the current language
      const myLang = languages.find((lg: Lang) => lg.label === lang.node.name) as Lang;

      // Add the relation between the repo and the language
      langByRepo.push({ repo_id: repo.id, lang_id: myLang.id });
    });
  });

  // Write the processed repos data to repos.json
  fs.writeFile('./data/repos.json', JSON.stringify(repos), (err) =>
    err ? console.error(err) : console.log('File repos.json is ready')
  );

  // Write the processed languages data to langs.json
  fs.writeFile('./data/langs.json', JSON.stringify(languages), (err) =>
    err ? console.error(err) : console.log('File langs.json is ready')
  );

  // Write the repo-language relationships to lang_by_repo.json
  fs.writeFile('./data/lang_by_repo.json', JSON.stringify(langByRepo), (err) =>
    err ? console.error(err) : console.log('File lang_by_repo.json is ready')
  );

  // Write status.json (Private/Public) data
  const status = [
    { id: 0, label: 'Private' },
    { id: 1, label: 'Public' }
  ];

  fs.writeFile('./data/status.json', JSON.stringify(status), (err) =>
    err ? console.error(err) : console.log('File status.json is ready')
  );
}

// Call the getRepos function to process the data
getRepos();

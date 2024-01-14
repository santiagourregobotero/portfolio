import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@app/config';
import { MarkdownService } from 'ngx-markdown';
import { Subject, forkJoin } from 'rxjs';

export interface JobExperience {
  role: string;
  company: string;
  date: string;
  description: string[];
}

export interface Recommendation {
  client_name: string;
  client_intro: string;
  client_avatar: string;
  recommend: string;
}

export class ProjectEntry {
  name: string = '';
  link: string = '';

  constructor(name: string, link: string) {
    (this.name = name), (this.link = link);
  }
}

export class Project {
  title: string = '';
  date: string = '';
  client: string = '';
  technology: string = '';
  description: string = '';
  images: string[] = [];
  link: string[] = [];
  category: string[] = [];

  shortDescription() {
    const MAX = 200;
    const short = this.description
      .split('\n')
      .join(' ')
      .substring(0, MAX)
      .replace(/<[^>]*>/g, '');
    return short;
  }
  detailDescription() {
    return this.description
      .split('\n')
      .map((piece) => `<p>${piece}</p>`)
      .join('');
  }
  isInCategory(category: string) {
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].toLowerCase().includes(category.toLowerCase()))
        return true;
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  resume: string = '';
  projectList: ProjectEntry[] = [];
  projects: Project[] = [];

  constructor(
    private http: HttpClient,
    private markdownService: MarkdownService
  ) {}

  init() {
    // const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    const headers = new HttpHeaders({
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0',
      'Access-Control-Allow-Origin': '*',
    });

    const Resume$ = this.http.get(`${AppConfig.resumeBaseUrl}/resume.md`, {
      responseType: 'text',
      headers: headers,
    });

    const Projects$ = this.loadProjects();

    const Font$ = this.http.get(
      'https://fonts.googleapis.com/earlyaccess/notosanssc.css',
      { responseType: 'text' }
    );
    Resume$.subscribe((data) => {
      this.resume = this.markdownService.parse(data);
      this.emitEvent('Resume Loaded');
    });
    return forkJoin([Resume$, Font$, Projects$]);
  }
  private eventSubject = new Subject<string>();

  loadProjects() {
    const headers = new HttpHeaders({
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0',
      'Access-Control-Allow-Origin': '*',
    });
    const Project$ = this.http.get(`${AppConfig.resumeBaseUrl}/project.md`, {
      responseType: 'text',
      headers: headers,
    });
    Project$.subscribe((data) => {
      this.projectList = this.parseProjectList(
        this.markdownService.parse(data)
      );
    });
    return Project$;
  }

  async parseProject(entry: any) {
    let name = entry['name'];
    let link = `${AppConfig.resumeBaseUrl}/${entry['link']}`;
    let data = (await this.http
      .get(link, { responseType: 'text' })
      .toPromise())!;

    let html = this.markdownService.parse(data);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // title
    let title = doc.querySelector('h2')?.innerHTML!;

    // date
    let date = doc.querySelector('code')?.innerHTML!;

    //category

    const h4Elements = Array.from(doc.querySelectorAll('h4'));
    let category: string[] = [];

    for (const h4 of h4Elements) {
      if (h4.textContent!.toLowerCase().includes('category')) {
        let elements = h4!.nextElementSibling?.children!;
        for (let i = 0; i < elements.length; i++) {
          category.push(elements.item(i)?.textContent!);
        }
      }
    }

    // images
    let images: string[] = [];
    doc.querySelectorAll('img')!.forEach((item, index) => {
      images.push(
        AppConfig.resumeBaseUrl + 'project/' + item.getAttribute('src')!
      );
    });

    // description
    let description = '';
    doc.querySelectorAll('p:not(li > p), ul')!.forEach((item, index) => {
      if (item.innerHTML.includes('<code>')) return;
      console.log(item.outerHTML);
      description = description + item.outerHTML + '\n';
    });

    let linkTable, infoTable;

    doc.querySelectorAll('table').forEach((item, index) => {
      if (
        item.innerHTML.includes('Technology') &&
        item.innerHTML.includes('Client')
      ) {
        linkTable = item!;
      } else if (
        item.innerHTML.includes('App') &&
        item.innerHTML.includes('Link')
      ) {
        infoTable = item!;
      }
    });

    let technology = linkTable!
      .querySelectorAll('tr')[1]
      .querySelectorAll('td')[0]!.innerHTML;

    let client = linkTable!.querySelectorAll('tr')[1].querySelectorAll('td')[1]!
      .innerHTML;

    let links: string[] = ['', '', '', '']; //android, iOS, web, github
    let linkLength = infoTable!.querySelectorAll('tr').length;
    for (let i = 1; i < linkLength; i++) {
      let type = infoTable!.querySelectorAll('tr')[i].querySelectorAll('td')[0]!
        .innerHTML;
      let link = infoTable!
        .querySelectorAll('tr')
        [i].querySelectorAll('td a')[0]!.href;
      switch (type.toLowerCase()) {
        case 'android':
          links[0] = link;
          break;
        case 'ios':
          links[1] = link;
          break;
        case 'web':
          links[2] = link;
          break;
        case 'github':
          links[3] = link;
          break;
      }
    }

    let project: Project = new Project();
    project.title = title!;
    project.date = date;
    project.images = images;
    project.category = category;
    project.description = description;
    project.link = links!;
    project.technology = technology;
    project.client = client;

    return project;
  }

  emitEvent(message: string) {
    this.eventSubject.next(message);
  }

  getEvent$() {
    return this.eventSubject.asObservable();
  }

  getName() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.resume, 'text/html');
    return doc.querySelector('h1')?.innerHTML || '';
  }

  getAbout() {
    return this.parseContent(this.resume, 'about', 'h2')[0];
  }

  getSkill() {
    return this.parseContent(this.resume, 'skill', 'h2')[0];
  }

  getEducation() {
    return this.parseContent(this.resume, 'education', 'h2')[0];
  }

  getRecommendation() {
    let content = this.parseContent(this.resume, 'recommendation', 'h2')[0];
    const parser = new DOMParser();
    const list: Recommendation[] = [];
    for (let recommend of this.parseContent(content, '', 'table', true)) {
      console.log('////////////////');
      console.log(recommend);
      const doc = parser.parseFromString(recommend, 'text/html');
      const tableData = doc.querySelectorAll('td');
      if (tableData.length < 6) continue;
      const client_name = tableData[1].textContent;
      const client_intro = tableData[3].textContent;
      const client_avatar = tableData[5].textContent;
      const data = doc.querySelector('code');

      let new_recommend: Recommendation = {
        client_name: client_name as string,
        client_intro: client_intro as string,
        client_avatar: client_avatar as string,
        recommend: data?.innerHTML as string,
      };
      list.push(new_recommend);
    }
    console.log(list);
    return list;
  }

  getExperience() {
    let content = this.parseContent(this.resume, 'experience', 'h2')[0];
    const parser = new DOMParser();
    const jobExperiences: JobExperience[] = [];

    for (let work of this.parseContent(content, '', 'h3', true)) {
      const doc = parser.parseFromString(work, 'text/html');
      const role = doc.querySelector('h3')?.textContent;
      const company = doc.querySelector('h4')?.textContent;
      const date = doc.querySelector('code')?.textContent;
      const content = doc.querySelectorAll('p');

      let job: JobExperience = {
        role: role as string,
        company: company as string,
        date: date as string,
        description: Array.from(content)
          .map((item) => {
            return item.innerHTML;
          })
          .slice(1),
      };

      jobExperiences.push(job);
    }
    return jobExperiences;
  }

  getLink() {
    let content = this.parseContent(this.resume, 'link', 'h2')[0];

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = Array.from(doc.querySelectorAll('a'));

    let links: { [key: string]: string } = {};
    for (const item of elements) {
      links[item.innerHTML.trim().toLocaleLowerCase()] = item.href;
    }
    return links;
  }

  async getProject() {
    this.projects = [];
    await Promise.all(
      this.projectList.map(async (project) => {
        this.projects.push(await this.parseProject(project));
      })
    );

    return this.projects;
  }

  parseContent(
    content: string,
    header: string,
    headerTag: string,
    withHeader: boolean = false
  ) {
    let html = content.trim();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const h2Elements = Array.from(doc.querySelectorAll(headerTag));
    let resContent = [],
      nextElement;
    for (const h2 of h2Elements) {
      if (h2.textContent!.toLowerCase().includes(header)) {
        nextElement = h2!.nextElementSibling;
        let res = withHeader ? h2.outerHTML : '';
        while (nextElement && nextElement.tagName.toLowerCase() !== headerTag) {
          res += nextElement.outerHTML!;
          nextElement = nextElement!.nextElementSibling;
        }
        resContent.push(res);
      }
    }
    return resContent.length ? resContent : [''];
  }

  parseProjectList(data: string) {
    const html = data.trim();
    const parsedData = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = Array.from(doc.querySelectorAll('a'));

    for (const item of elements) {
      const name = item.innerHTML;
      const link = item.getAttribute('href')!;
      parsedData.push(new ProjectEntry(name, link));
    }
    return parsedData;
  }
}

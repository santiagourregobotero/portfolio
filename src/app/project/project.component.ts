import { Component, OnInit, ViewChild } from '@angular/core';
import { Project, ResumeService } from '@lib/service/resume/resume.service';
import { DetailComponent } from '../../lib/components/detail/detail.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  loaded = false;
  show_detail = false;
  projects: Project[] = [];
  filtered_projects: Project[] = [];
  filter_list: string[] = [
    'All',
    'Mobile',
    'Web',
    'Desktop',
    'React',
    'Angular',
    'ASP.NET',
    'Spring Boot',
    'SaaS',
    'WordPress',
    'Laravel',
    'Business',
  ];
  @ViewChild('detail_dlg')
  detailRef!: DetailComponent;

  constructor(private resumeService: ResumeService) {
    this.resumeService.getEvent$().subscribe((message) => {
      this.load();
    });
    this.load();
  }

  async load() {
    this.projects = await this.resumeService.getProject();
    this.filterChanged(0);
    this.loaded = true;
  }
  /*
  parseList(data: string) {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parsedData = [];

    let match;
    while ((match = regex.exec(data)) !== null) {
      const name = match[1];
      const link = match[2];
      parsedData.push({ name, link });
    }
    return parsedData;
  }

  parseTable(data: string, type: string = 'link'): any {
    const tableRegex = /<table.*?>(.*?)<\/table>/g;
    const rowRegex = /<tr.*?>(.*?)<\/tr>/gs;
    const cellRegex = /<t[dh].*?>(.*?)<\/t[dh]>/gs;

    const tableMatches = data.match(tableRegex);
    if (!tableMatches) return null;

    for (const tableContent of tableMatches) {
      const rows = tableContent!.match(rowRegex) || [];
      const tableData = rows.map((row) => {
        const cells = row.match(cellRegex) || [];
        return cells.map((cell) => cell.replace(/<\/?t[dh].*?>/g, ''));
      });

      if (
        ['technology', 'client'].includes(tableData[0][0].toLowerCase()) &&
        ['technology', 'client'].includes(tableData[0][1].toLowerCase()) &&
        type == 'ex-info'
      ) {
        let count = tableData[0].length;
        let technology = '';
        let client = '';
        for (let i = 0; i < count; i++) {
          if (tableData[0][i].toLowerCase() == 'technology') {
            technology = tableData[1][i];
          } else if (tableData[0][i].toLowerCase() == 'client') {
            client = tableData[1][i];
          }
        }
        return { technology, client };
      }
      if (
        ['app', 'link'].includes(tableData[0][0].toLowerCase()) &&
        ['app', 'link'].includes(tableData[0][1].toLowerCase()) &&
        type == 'link'
      ) {
        tableData.shift();
        let indexDict: { [key: string]: number } = {
          android: 0,
          ios: 1,
          web: 2,
          github: 3,
        };
        let links = ['', '', '', ''];

        tableData.map((linkInfo) => {
          let key = linkInfo[0].toLowerCase();
          let link = /<a\s+href="(.*?)"/.exec(linkInfo[1])![1];
          if (key in indexDict) links[indexDict[key]] = link;
        });
        return links;
      }
    }
    return null;
  }

  async parseProject(entry: any) {
    let name = entry['name'];
    let link = 'assets/data/' + entry['link'];

    let project: Project = new Project();

    let data = (await this.http
      .get(link, { responseType: 'text' })
      .toPromise())!;

    let html = this.markdownService.parse(data);
    let title = /<h2>(.*?)<\/h2>/g.exec(html)![1];
    let date = /<p><code>(.*?)<\/code><\/p>/g.exec(html)![1];
    let images = [...html.matchAll(/<img src="(.*?)" alt="">/g)].map(
      (match) => 'assets/' + match[1].replace('../../', '')
    );
    let description = [
      ...html.matchAll(/<p>(?!<code>.*<\/code>)(.*?)<\/p>/g),
    ].map((match) => match[1]);
    let link_source = this.parseTable(html);
    let ex_info = this.parseTable(html, 'ex-info');

    project.title = title;
    project.date = date;
    project.images = images;
    project.description = description.join('\n');
    project.link = link_source;
    project.technology = ex_info.technology;
    project.client = ex_info.client;

    return project;
  }
  */

  ngOnInit() {
    /*
    this.http
      .get('assets/data/project.md', { responseType: 'text' })
      .subscribe(async (data) => {
        let entryProject = this.parseList(data);
        entryProject.forEach(async (project) => {
          this.projects.push(await this.parseProject(project));
        });
        entryProject.forEach(async (project) => {
          this.projects.push(await this.parseProject(project));
        });
        this.projects = await Promise.all(
          await entryProject.map((project) => this.parseProject(project))
        );
        this.filtered_projects = this.projects.filter((item) =>
          item.isInCategory('')
        );
      });
      */
  }

  detail(index: number) {
    this.detailRef.show(this.projects[index]);
  }

  filterChanged(index: number) {
    let filter_query =
      this.filter_list[index] == 'All' ? '' : this.filter_list[index];
    this.filtered_projects = this.projects.filter((item) =>
      item.isInCategory(filter_query)
    );
  }

  close_detail() {}
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { ContentContainerComponent } from '../lib/components/content-container/content-container.component';
import { DetailComponent } from '../lib/components/detail/detail.component';
import { FilterBarComponent } from '../lib/components/filter-bar/filter-bar.component';
import { HeaderComponent } from '../lib/components/header/header.component';
import { ImageViewerComponent } from '../lib/components/image-viewer/image-viewer.component';
import { InfoContainerComponent } from '../lib/components/info-container/info-container.component';
import { LoadComponent } from '../lib/components/load/load.component';
import { ProjectContainerComponent } from '../lib/components/project-container/project-container.component';
import { RecommendationContainerComponent } from '../lib/components/recommendation-container/recommendation-container.component';
import { WorkContainerComponent } from '../lib/components/work-container/work-container.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './project/project.component';
import { WorkComponent } from './work/work.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ContentContainerComponent,
    WorkComponent,
    WorkContainerComponent,
    ProjectComponent,
    ProjectContainerComponent,
    RecommendationContainerComponent,
    ContactComponent,
    DetailComponent,
    InfoContainerComponent,
    ImageViewerComponent,
    LoadComponent,
    FilterBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component } from '@angular/core';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { UserStatusService } from './services/user-status.service';
import { AngularFireAuth } from '@angular/fire/auth';
import iziToast from 'izitoast';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface Node {
  name: string;
  children?: Node[];
  routeTo?: string;
  icon?: string;
}

const TREE_DATA: Node[] = [
  { name: 'Dashboard', routeTo: '/dashboard', icon: 'view-dashboard' },
  {
    name: 'Personal Information Management',
    children: [
      { name: 'Edit Personal Data', routeTo: '/edit-info', icon: 'edit' }
    ]
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cs315-frontend';

  treeControl = new NestedTreeControl<Node>(node => node.children);
  studentDataSource = new MatTreeNestedDataSource<Node>();
  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  constructor(public uss: UserStatusService, private auth: AngularFireAuth, private router: Router) {
    this.studentDataSource.data = TREE_DATA;
    auth.user.subscribe(u => {
      if (u) {
        if (!u.emailVerified) {
          u.sendEmailVerification().then(r => {
            iziToast.info({
              title: 'Verify your account',
              message: 'A verification email was sent to the email you were registered on',
              position: 'center',
              overlay: true
            });
          });
        }
      }
    });

    router.events.subscribe(e => {
      if (e instanceof NavigationStart && !e.url.includes('edit-info')) {
        if (uss.user.getValue() && uss.emailVerified.getValue() === 'true' && !uss.user.getValue().completed) {
          this.router.navigate(['/edit-info']);
          iziToast.info({
            title: 'Please fill your details before you may continue',
            position: 'center',
            overlay: true
          });
        }
      }
    });
  }
}

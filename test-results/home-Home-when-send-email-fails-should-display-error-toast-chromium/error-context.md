# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - link "Mako" [ref=e4] [cursor=pointer]:
        - /url: /
      - navigation [ref=e5]:
        - link "Services" [ref=e6] [cursor=pointer]:
          - /url: /services
        - link "Team" [ref=e7] [cursor=pointer]:
          - /url: /team
        - combobox [ref=e8] [cursor=pointer]:
          - generic: EN
          - img
    - main [ref=e9]:
      - generic [ref=e10]:
        - heading "Let's create the application you need." [level=1] [ref=e11]
        - paragraph [ref=e13]: From requirements to MVP, to a scalable app serving you and your users.
      - generic [ref=e14]:
        - group [ref=e15]:
          - generic [ref=e16]:
            - textbox "Enter your message here..." [ref=e17]: hi, what's up? tudo bem?
            - paragraph [ref=e18]: Your message will be sent to Mako team.
        - button "Contact Us" [ref=e19] [cursor=pointer]
  - region "Notifications alt+T"
```
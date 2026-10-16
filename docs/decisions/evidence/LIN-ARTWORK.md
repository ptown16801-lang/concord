# Evidence snapshot: Homepage artwork — approved source and editing workflow v1.0.0

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/document/homepage-artwork-approved-source-and-editing-workflow-v100-b695d75df212
- Version: 2026-09-15T23:01:10.168Z
- Source date: 2026-09-15T23:01:10.168Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

# Concord homepage artwork — v1.0.0

## Approved decision

On September 15, 2026, the user selected the final neon wireframe camera-headed presenter image as the Concord homepage artwork and asked that its available sources, revisions, and editing data be retained as a reusable workflow. This designation applies to the artwork; it does not authorize silently replacing unrelated Workbench content.

**Workflow issue:** [JON-55](<https://linear.app/jons-garage/issue/JON-55/homepage-artwork-approved-master-and-reusable-editing-workflow>)

**Canonical asset folder:** [Concord — Homepage Artwork on Google Drive](<https://drive.google.com/drive/folders/1Wc5xIhc7YDLIczTop1ZSLRuGgDlypkdp>)

**Approved PNG:** [Concord_Homepage_APPROVED_v1.0.0.png](<https://drive.google.com/file/d/1jMYd9RYLjDapZbxXWwTsv9RcU61nq-eC/view?usp=drivesdk>)

## Exact source identity

* Native size: **1672 × 941**.
* Format: RGB PNG, **static**.
* Original basename: `neon_wireframe_presenter_on_the_grid_stage.png`.
* Conversation generation ID: `6f3a50ba-6d19-49e5-9001-7a89e7c1542c`.
* SHA-256: `3a4c2613795f986fe2e70820ffd2eac49907ab645ec3b0aea9c5f43841a06f4b`.
* Approved visual: camera-headed suited presenter and podium, empty chair, dim large green Concord loop logo, green/blue/white wireframe, a smoke-lit projector beam, no teleprompter poles. Preserve the selected pixels rather than silently changing the scene.

## Workflow package

`Concord_Homepage_Workflow_v1.0.0.zip` contains the approved PNG, three user-supplied visual references, 14 available generated PNG revisions, the visible edit requests and generation IDs, explicit rejected/missing-revision status, masks, transparent regional PNGs, an OpenRaster editing file, an embedded-image SVG, an offline homepage preview, an offline regional editing studio, reproducible scripts, and a checksummed manifest. The archive is stored in the canonical folder; its final attachment link is indexed in <issue id="ba724b93-fe3c-42ed-8921-b13dde7fe2f0" href="https://linear.app/jons-garage/issue/JON-55/homepage-artwork-approved-master-and-reusable-editing-workflow">JON-55</issue>.

The selected image is retained byte-for-byte. The six visible editing layers partition the source into backdrop/logo, floor/reflections, beam/smoke, presenter/camera, podium, and chair regions. A hidden original reference and an empty new-logo overlay are included in the OpenRaster file.

## What the layers do and do not mean

These are **regional source-pixel partitions**, not recovered intrinsic object layers. The original logo is still baked into the background and the light projected over it. Chair openings and conservative object-edge margins contain some adjacent backdrop. There is no invented hidden clean plate.

A local background change can preserve the presenter, podium, and chair source pixels without regenerating the whole scene. A complete logo replacement still needs local cleanup in the backdrop and its intersections with the beam and chair openings. Do not tell the user that the old logo is already a fully independent transparent object.

The authoritative brand source is the user's uploaded rounded-square/four-loop symbol, retained as `references/concord-logo-authoritative.jpeg`. The earlier wordmark/planet logo and two ordinary-human-presenter scenes are rejected history, not approved source material.

## Offline editing and preservation

`Concord_Homepage_STUDIO.html` is self-contained. It offers region visibility/opacity, full-frame PNG patches clipped to the selected region, PNG export, and editable draft JSON export/import with embedded layer image data. It makes no external requests and never writes back to the approved master.

`Concord_Homepage_PREVIEW.html` displays the exact artwork in a responsive standalone homepage. It contains no production Workbench integration. The live Concord website has not been deployed or overwritten.

For scriptable local edits, use `tools/compose_region.py`. It rejects wrong dimensions and existing output paths and verifies pixel identity outside the edit mask. New outputs are candidates until explicitly approved.

## Verification performed

* Six layers recompose to the original with **zero maximum RGB channel error** across all 1,573,352 pixels.
* Backdrop edit mask has no overlap with the foreground-protection mask.
* Browser tests passed for initial pixel identity, layer toggle and reset, embedded draft save/load round-trip, region patch isolation, native-size PNG export, and mobile width behavior.
* No browser script errors or external HTTP requests were recorded.
* Browser tests used managed Chromium with HTML loaded through Playwright `set_content`; they do not establish compatibility with the Android ChatGPT attachment viewer.

## Historical requests not falsely marked complete

No native 4K master, recovered 3D meshes or scene, original lighting/ray-tracing configuration, animation timeline, physically validated neck/lens/beam rig, or linear-regression animation audit was supplied by the previous generation steps. Seeds were null and accepted-render generation prompts were not exposed. Preserve these as future requirements, not as completed capabilities.

For future green-line animation, retain each measured line length, cap downward displacement at 10% of that line's length, and record any regression diagnostics separately. No score is claimed by the archive.

## Version control rule

Never overwrite v1.0.0. Preserve all available history, including rejected variants. Save each candidate separately, verify protected pixels and overlap regions, record its hash and changed parameters, and obtain explicit approval before promoting it. Read-only status is a workflow convention; no special Drive immutable-storage or sharing policy was applied.

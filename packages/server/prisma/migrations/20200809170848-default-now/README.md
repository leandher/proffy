# Migration `20200809170848-default-now`

This migration has been generated by Leandher at 8/9/2020, 2:08:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Connection" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200809161219-naming..20200809170848-default-now
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
   id          Int          @default(autoincrement()) @id
@@ -40,7 +40,7 @@
 model Connection {
   id         Int      @default(autoincrement()) @id
   user_id    Int
-  created_at DateTime @default(dbgenerated())
+  created_at DateTime @default(now())
   user       User     @relation(fields: [user_id], references: [id])
 }
```

